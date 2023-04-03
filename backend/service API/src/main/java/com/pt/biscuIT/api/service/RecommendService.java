package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.api.dto.content.ContentInfoListCategoryDto;
import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.entity.Type;
import com.pt.biscuIT.db.repository.CategoryRepositorySupport;
import com.pt.biscuIT.db.repository.ContentRepository;
import com.pt.biscuIT.db.repository.ContentRepositorySupport;
import com.pt.biscuIT.db.repository.MemberRepositorySupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/*
 * RecommandService
 * @author 7unho
 * @since 2020-11-23
 */
@Slf4j
@Service("recommendService")
public class RecommendService {
    @Autowired
    ContentRepository contentRepository;
    @Autowired
    ContentRepositorySupport contentRepositorySupport;
    @Autowired
    CategoryRepositorySupport categoryRepositorySupport;

    public Page<ContentInfoDto> getRandomContent(Pageable pageable, int from, int to, Type type) {
        Page<Content> contentList = contentRepositorySupport.findContentByRandom(pageable, from, to, type);
        Page<ContentInfoDto> res = contentList.map(ContentInfoDto::new);

        return res;
    }

    public Page<ContentInfoListCategoryDto> getRandomCategoryContent(int categoryCount, Pageable pageable, int from, int to, Type type) {
        List<String> categories = contentRepository.findRandomCategoryByCount(categoryCount);
        List<ContentInfoListCategoryDto> contentCategoryList = new ArrayList<>();

        categories.forEach((category -> {
            ContentInfoListCategoryDto content = new ContentInfoListCategoryDto().builder()
                                                                                 .category(category)
                                                                                 .build();
            List<Long> categoryIdList = contentRepositorySupport.findCategoryIdByCategory(category);
            Page<Content> contentList = contentRepositorySupport.findRecentContentByCategory(categoryIdList, pageable, Long.MAX_VALUE, from, to, type);

            content.setCategory(category);
            content.setItems(contentList.map(ContentInfoDto::new).getContent());

            contentCategoryList.add(content);
        }));
        return new PageImpl<>(contentCategoryList, pageable, contentCategoryList.size());
    }

    public Page<ContentInfoListCategoryDto> getFavoriteCategoryContent(Pageable pageable, int from, int to, Type type, Long memberId) {
        List<Long> categoryIdList = contentRepositorySupport.findCategoryIdByFavorite(memberId);
        List<ContentInfoListCategoryDto> contentCategoryList = new ArrayList<>();

        categoryIdList.forEach((categoryId -> {
            ContentInfoListCategoryDto content = new ContentInfoListCategoryDto().builder()
                                                                                 .build();

            List<Long> categoryIds = new ArrayList<>();
            categoryIds.add(categoryId);
            String category = categoryRepositorySupport.findSubNameByCategoryId(categoryId);
            Page<Content> contentList = contentRepositorySupport.findRecentContentByCategory(categoryIds, pageable, Long.MAX_VALUE, from, to, type);

            content.setCategory(category);
            content.setItems(contentList.map(ContentInfoDto::new).getContent());

            contentCategoryList.add(content);
        }));

        return new PageImpl<>(contentCategoryList, pageable, contentCategoryList.size());
    }

    public Page<ContentInfoDto> getBookmarkedContent(Pageable pageable, int from, int to, Type type, Long id) {
        Page<Content> contentList = contentRepositorySupport.findBookmarkedContent(pageable, from, to, type, id);
        Page<ContentInfoDto> res = contentList.map(ContentInfoDto::new);

        return res;
    }
}
