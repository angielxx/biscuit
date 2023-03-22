package com.pt.biscuIT.api.dto.content;

import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * @author 7unho
 * @since 2020-11-23
 * description = "컨텐츠의 상세 정보를 가져온다."
 */
@Data
@Builder
public class ContentInfoDto {
    private Long id;
    private String title;
    private String url;
    private String creditBy;
    private String createdAt;
    private String timeCost;
    private String type;
    private boolean isMarked;
    private List<Integer> tags;

}
