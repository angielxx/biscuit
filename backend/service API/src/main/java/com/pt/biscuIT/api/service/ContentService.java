package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.common.exception.BiscuitException;
import com.pt.biscuIT.common.exception.ErrorCode;
import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.entity.ContentView;
import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.entity.MemberHistory;
import com.pt.biscuIT.db.entity.Type;
import com.pt.biscuIT.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service("contentService")
@RequiredArgsConstructor
public class ContentService {
    private final ContentRepository contentRepository;
    private final ContentRepositorySupport contentRepositorySupport;
    private final ContentViewRepositorySupport contentViewRepositorySupport;
    private final MemberBookmarkRepositorySupport memberBookmarkRepositorySupport;
    private final MemberHistoryRepository memberHistoryRepository;

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

    public void getContentDetail(Member member, Long contentId) {
        Content content = contentRepository.findById(contentId)
            .orElseThrow(() -> new BiscuitException(ErrorCode.CONTENT_NOT_FOUND));
        contentRepository.save(Content.builder()
                .id(content.getId())
                .title(content.getTitle())
                .source(content.getSource())
                .writer(content.getWriter())
                .channel(content.getChannel())
                .createdDate(content.getCreatedDate())
                .hit(content.getHit() + 1)
                .timeCost(content.getTimeCost())
                .type(content.getType())
                .build());

        if(member != null) {
            memberHistoryRepository.save(MemberHistory.builder()
                .member(member)
                .content(content)
                .createdDate(LocalDateTime.now())
                .build());
        }
    }

    public void setProperty(List<ContentInfoDto> contentList, Long memberId) {
        if(memberId == null) return;

        contentList.forEach(content -> {
            content.setMarked(memberBookmarkRepositorySupport.isMarked(memberId, content.getId()));
        });
    }
}
