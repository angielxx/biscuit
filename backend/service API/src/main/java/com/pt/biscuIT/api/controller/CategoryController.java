package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.api.dto.category.CategoryInfoDto;
import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.api.response.CategoryInfoListRes;
import com.pt.biscuIT.api.response.RandomRecentContentRes;
import com.pt.biscuIT.api.response.SearchContentRes;
import com.pt.biscuIT.api.service.CategoryService;
import com.pt.biscuIT.api.service.ContentService;
import com.pt.biscuIT.common.exception.BiscuitException;
import com.pt.biscuIT.common.exception.ErrorCode;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import com.pt.biscuIT.common.model.response.PageMetaData;
import com.pt.biscuIT.db.repository.CategoryRepository;
import com.pt.biscuIT.db.repository.ContentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@Slf4j
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @Autowired
    ContentService contentService;

    @GetMapping
    public ResponseEntity<? extends BaseResponseBody> getCategories() {
        List<CategoryInfoDto> categoryItemList = categoryService.getCategoryItemList();

        CategoryInfoListRes res = CategoryInfoListRes.builder()
                                                     .categories(categoryItemList)
                                                     .build();
        return ResponseEntity.status(200).body(CategoryInfoListRes.of(HttpStatus.OK.value(), "SUCCESS", res));
    }

    @GetMapping("/{category}/contents")
    public ResponseEntity<? extends BaseResponseBody> getContentByCategory(
            @PathVariable String category,
            @PageableDefault(size = 30, sort = "createdDate", page = 0) Pageable pageable,
            @RequestParam(defaultValue = "999999") Long lastContentId,
            @RequestParam(required = false, defaultValue = "0") int time
    ) {
        Page<ContentInfoDto> contentList = contentService.getCategoryContent(category, pageable, lastContentId, time);
        if(contentList.getContent().size() == 0) throw new BiscuitException(ErrorCode.CONTENT_NOT_FOUND);

        PageMetaData metaData = PageMetaData.builder()
                .last(contentList.isLast())
                .lastContentId(
                        contentList.getContent().get(contentList.getContent().size() - 1).getId()
                )
                .build();

        RandomRecentContentRes res = RandomRecentContentRes.builder()
                .metaData(metaData)
                .results(contentList.getContent())
                .build();

        return ResponseEntity.status(200).body(RandomRecentContentRes.of(HttpStatus.OK.value(), "SUCCESS", res));
    }
}
