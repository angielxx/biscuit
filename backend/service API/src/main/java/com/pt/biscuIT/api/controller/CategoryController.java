package com.pt.biscuIT.api.controller;

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

@RestController
@RequestMapping("/api/categories")
@Slf4j
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<? extends BaseResponseBody> getCategories(Pageable pageable) {
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "SUCCESS"));
    }
}
