package com.pt.biscuIT.api.dto.content;

import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.entity.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
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
    private String source;
    private String creditBy;
    private LocalDate createdDate;
    private Integer timeCost;
    private String type;
    private boolean isMarked;
    private List<String> tags;
    private Integer hit;

    public ContentInfoDto(Content content) {
        this.id = content.getId();
        this.title = content.getTitle();
        this.source = content.getSource();
        this.creditBy = content.getChannel();
        this.createdDate = content.getCreatedDate();
        this.timeCost = content.getTimeCost();
        this.type = Type.ARTICLE.toString();
        this.isMarked = false;
        this.hit = content.getHit();
    }
}
