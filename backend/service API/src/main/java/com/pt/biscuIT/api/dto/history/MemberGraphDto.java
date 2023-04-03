package com.pt.biscuIT.api.dto.history;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
public class MemberGraphDto {
    private String category;
    private Long count;

    @QueryProjection
    public MemberGraphDto(String category, Long count) {
        this.category = category;
        this.count = count;
    }
}
