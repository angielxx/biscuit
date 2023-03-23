package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.api.dto.category.CategoryInfoDto;
import com.pt.biscuIT.api.response.CategoryInfoListRes;
import com.pt.biscuIT.api.response.SearchContentRes;
import com.pt.biscuIT.api.service.CategoryService;
import com.pt.biscuIT.api.service.ContentService;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import com.pt.biscuIT.db.repository.CategoryRepository;
import com.pt.biscuIT.db.repository.ContentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@Slf4j
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping
    public ResponseEntity<? extends BaseResponseBody> getCategories() {
        List<CategoryInfoDto> categoryItemList = categoryService.getCategoryItemList();

        CategoryInfoListRes res = CategoryInfoListRes.builder()
                                                     .categories(categoryItemList)
                                                     .build();
        return ResponseEntity.status(200).body(CategoryInfoListRes.of(200, "SUCCESS", res));
    }
}
