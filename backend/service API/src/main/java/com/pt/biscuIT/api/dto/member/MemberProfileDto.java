package com.pt.biscuIT.api.dto.member;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberProfileDto {
    private int exp;
    private String job;
    private int period;
}
