package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.common.exception.BiscuitException;
import com.pt.biscuIT.common.exception.ErrorCode;
import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.repository.ContentRepository;
import com.pt.biscuIT.db.repository.ContentRepositorySupport;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.PathBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("contentService")
public class ContentService {
    @Autowired
    ContentRepository contentRepository;
    @Autowired
    ContentRepositorySupport contentRepositorySupport;

    public Page<ContentInfoDto> getCategoryContent(
            String category,
            @PageableDefault(size = 30, sort = "createdDate")
            Pageable pageable) {
        Page<Content> contentList = contentRepositorySupport.findContentByCategory(category, pageable);
        if (contentList.getSize() == 0) throw new BiscuitException(ErrorCode.CONTENT_NOT_FOUND);

        return contentList.map(ContentInfoDto::new);
    }
}
