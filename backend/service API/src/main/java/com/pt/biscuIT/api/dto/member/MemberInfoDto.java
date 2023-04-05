package com.pt.biscuIT.api.dto.member;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class MemberInfoDto {
    private Long memberId;
    private String nickname;
    private String job;
    private int period;
    private List<String> interests;
}
