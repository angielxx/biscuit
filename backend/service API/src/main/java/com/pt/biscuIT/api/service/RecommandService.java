package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.api.dto.content.ContentInfoListCategoryDto;
import com.pt.biscuIT.db.entity.Category;
import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.repository.ContentRepository;
import com.pt.biscuIT.db.repository.ContentRepositorySupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

/*
 * RecommandService
 * @author 7unho
 * @since 2020-11-23
 */
@Slf4j
@Service("recommandService")
public class RecommandService {
    @Autowired
    ContentRepository contentRepository;
    @Autowired
    ContentRepositorySupport contentRepositorySupport;

    public Page<ContentInfoDto> getRandomContent(Pageable pageable, int time) {
        Page<ContentInfoDto> res = new PageImpl<>(new ArrayList<>(), pageable, 0);

        Page<Content> contentList = contentRepositorySupport.findContentByRandom(pageable, time);
        res = contentList.map(ContentInfoDto::new);

        return res;
    }

    public Page<ContentInfoListCategoryDto> getRandomCategoryContent(int categoryCount, Pageable pageable) {
        List<String> categories = contentRepository.findRandomCategoryByCount(categoryCount);
        List<ContentInfoListCategoryDto> contentCategoryList = new ArrayList<>();

        categories.forEach((category -> {
            ContentInfoListCategoryDto content = new ContentInfoListCategoryDto().builder()
                                                                                 .category(category)
                                                                                 .build();
            Page<Content> contentList = contentRepositorySupport.findRecentContentByCategory(category, pageable, 0L, 0);

            content.setItems(contentList.map(ContentInfoDto::new).getContent());

            contentCategoryList.add(content);
        }));
        return new PageImpl<>(contentCategoryList, pageable, contentCategoryList.size());
    }
}
