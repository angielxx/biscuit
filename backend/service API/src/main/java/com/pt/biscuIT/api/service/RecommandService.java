package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
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

    public Page<ContentInfoDto> getRandomContent(String option, Pageable pageable, int categoryCount) {
        Page<Content> contentList;
        Page<ContentInfoDto> res = new PageImpl<>(new ArrayList<>(), pageable, 0);
        if("recent".equals(option)){
            contentList = contentRepositorySupport.findRecentContentByRandom(pageable);
            res = contentList.map(ContentInfoDto::new);
//            res = new PageImpl<>(contentList, pageable, contentList.size());
        } else if("popular".equals(option)) {
            return null;
        } else if("category".equals(option)) {
            List<String> categories = contentRepository.findRandomCategoryByCount(categoryCount);

            categories.forEach((category -> {
                System.out.println("CATEGORY >>>>>> " + category.toString());
            }));
            contentList = contentRepositorySupport.findRecentContentByRandom(pageable);
            res = contentList.map(ContentInfoDto::new);
        }


        return res;
    }
}
