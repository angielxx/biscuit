package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.category.CategoryCodeNameDto;
import com.pt.biscuIT.api.dto.category.CategoryInfoDto;
import com.pt.biscuIT.db.entity.Category;
import com.pt.biscuIT.db.repository.CategoryRepository;
import com.pt.biscuIT.db.repository.CategoryRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("categoryService")
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CategoryRepositorySupport categoryRepositorySupport;

    public List<CategoryInfoDto> getCategoryItemList() {
        List<CategoryInfoDto> res = new ArrayList<>();

        // 1. MAIN_NAME 먼저 추출.
        List<String> itemList = categoryRepository.findCodeAndMainNameList();

        // 2. 추출된 카테고리를 기준으로 SUB_NAME으로 카테고리 추출.
        itemList.forEach((record) -> {
            String mainName = record.split(",")[0];
            Integer code = Integer.parseInt(record.split(",")[1].substring(0, 2));

            CategoryCodeNameDto mainItem = CategoryCodeNameDto.builder()
                    .code(code)
                    .subName(mainName)
                    .build();

            List<Category> subItemList = categoryRepositorySupport.findSubCategoryList(code.toString());
            List<CategoryCodeNameDto> subCategoryItemList = new ArrayList<>();

            subItemList.forEach((subItem) -> {
                subCategoryItemList.add(
                        CategoryCodeNameDto
                                .builder()
                                .code(subItem.getCode())
                                .subName(subItem.getSubName())
                                .build()
                );
            });
            CategoryInfoDto categoryItem = CategoryInfoDto.builder()
                                                          .code(mainItem.getCode())
                                                          .mainName(mainItem.getSubName())
                                                          .subCategories(subCategoryItemList)
                                                          .build();

            res.add(categoryItem);
        });

        return res;
    }
}
