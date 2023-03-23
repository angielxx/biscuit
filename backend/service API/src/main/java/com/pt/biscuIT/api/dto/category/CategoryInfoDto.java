package com.pt.biscuIT.api.dto.category;

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
    private Long id;
    private String mainName;
    List<CategoryIdNameDto> subCategories;
}
