package com.pt.biscuIT.api.request;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberInfoReq {
    private String nickname;
    private String job;
    private int period;
    private List<String> interests;
}