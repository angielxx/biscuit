package com.pt.biscuIT.api.dto.history;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
public class MemberHistoryDto {
    private LocalDateTime date;
    private Long count;

    @QueryProjection
    public MemberHistoryDto(LocalDateTime date, Long count) {
        this.date = date;
        this.count = count;
    }
}