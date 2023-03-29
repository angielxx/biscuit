package com.pt.biscuIT.api.dto.category;

import com.pt.biscuIT.db.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryInfoDto {
    Integer code;
    String mainName;
    List<CategoryCodeNameDto> subCategories;

    public CategoryInfoDto(Category category) {
        this.code = category.getCode();
        this.mainName = category.getMainName();
    }
}
