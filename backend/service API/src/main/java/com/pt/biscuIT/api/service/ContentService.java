package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.common.exception.BiscuitException;
import com.pt.biscuIT.common.exception.ErrorCode;
import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.repository.ContentRepository;
import com.pt.biscuIT.db.repository.ContentRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service("contentService")
public class ContentService {
    @Autowired
    ContentRepository contentRepository;
    @Autowired
    ContentRepositorySupport contentRepositorySupport;

    public Page<ContentInfoDto> getCategoryContent (String category, Pageable pageable, Long lastContentId, int time, int hitRate) {
        Page<Content> contentList = contentRepositorySupport.findContentByCategory(category, pageable, lastContentId, time, hitRate);

        return contentList.map(ContentInfoDto::new);
    }

    public void getContentDetail(Long contentId) {
        Content content = contentRepository.findById(contentId)
            .orElseThrow(() -> new BiscuitException(ErrorCode.CONTENT_NOT_FOUND));
        content.setHit(content.getHit() + 1);
        contentRepository.save(content);

    }

}
