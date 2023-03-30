package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.common.exception.BiscuitException;
import com.pt.biscuIT.common.exception.ErrorCode;
import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.entity.ContentView;
import com.pt.biscuIT.db.entity.Type;
import com.pt.biscuIT.db.repository.ContentRepository;
import com.pt.biscuIT.db.repository.ContentRepositorySupport;
import com.pt.biscuIT.db.repository.ContentViewRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("contentService")
public class ContentService {
    @Autowired
    ContentRepository contentRepository;
    @Autowired
    ContentRepositorySupport contentRepositorySupport;

    @Autowired
    ContentViewRepositorySupport contentViewRepositorySupport;
    public Page<ContentInfoDto> getCategoryContent (String category, Pageable pageable, Long lastContentId, int from, int to, String condition, Type type) {
        Page<Content> contentList = null;
        if("recent".equals(condition)) {
            List<Long> categoryIdList = contentRepositorySupport.findCategoryIdByCategory(category);
            contentList = contentRepositorySupport.findRecentContentByCategory(categoryIdList, pageable, lastContentId, from, to, type);
        }
        else if("hit".equals(condition)) {
            Long popularId = contentViewRepositorySupport.findIdByContentId(lastContentId);
            List<Long> categoryIdList = contentRepositorySupport.findCategoryIdByCategory(category);
            contentList = contentRepositorySupport.findPopularContentByCategory(categoryIdList, pageable, popularId, from, to, type);
        } else throw new BiscuitException(ErrorCode.INVALID_PARAMETER);
        if(contentList == null || contentList.getContent().size() == 0) throw new BiscuitException(ErrorCode.CONTENT_NOT_FOUND);

        return contentList.map(ContentInfoDto::new);
    }

    public void getContentDetail(Long contentId) {
        Content content = contentRepository.findById(contentId)
            .orElseThrow(() -> new BiscuitException(ErrorCode.CONTENT_NOT_FOUND));
        content.setHit(content.getHit() + 1);
        contentRepository.save(content);

    }
}
