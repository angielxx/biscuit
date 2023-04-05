package com.pt.biscuIT.api.request;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;

@Data
@Builder
public class MemberOnboardingReq {
    private String nickname;
    private String job;
    private int period;
    private ArrayList<String> interests;
}
