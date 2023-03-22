package com.pt.biscuIT.api.dto.content;

import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.entity.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author 7unho
 * @since 2020-11-23
 * description = "컨텐츠의 상세 정보를 가져온다."
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContentInfoDto {
    private Long id;
    private String title;
    private String url;
    private String creditBy;
    private LocalDateTime createdDate;
    private Integer timeCost;
    private String type;
    private boolean isMarked;
    private List<String> tags;

    public ContentInfoDto(Content content) {
        this.id = content.getId();
        this.title = content.getTitle();
        this.url = content.getUrl();
        this.creditBy = content.getCreditBy();
        this.createdDate = content.getCreatedDate();
//        this.timeCost = content.getTimeCost();
        this.type = Type.POST.toString();
        this.isMarked = false;
    }
}