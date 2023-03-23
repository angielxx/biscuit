package com.pt.biscuIT.api.dto.content;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContentInfoListCategoryDto {
    private String category;
    private List<ContentInfoDto> items;

}
