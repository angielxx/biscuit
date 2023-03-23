package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.response.CategoryInfoListRes;
import com.pt.biscuIT.db.entity.Category;
import com.pt.biscuIT.db.repository.CategoryRepository;
import com.pt.biscuIT.db.repository.CategoryRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("categoryService")
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;
    public List<CategoryInfoListRes> getCategoryItemList() {
        // 1. MAIN_NAME 먼저 추출.
        List<Category> mainNameList = categoryRepository.findCodeAndMainNameList();

        mainNameList.forEach((mainName) -> {
            System.out.println(mainName.getMainName());
        });
        // 2. 추출된 카테고리를 기준으로 SUB_NAME으로 카테고리 추출.

        return null;
    }
}
