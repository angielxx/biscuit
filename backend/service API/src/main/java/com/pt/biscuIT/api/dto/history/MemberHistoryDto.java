package com.pt.biscuIT.api.dto.history;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberHistoryDto {
    private LocalDate date;
    private Long count;
    @QueryProjection
    public MemberHistoryDto(LocalDateTime date, Long count) {
        this.date = date.toLocalDate();
        this.count = count;
    }
}