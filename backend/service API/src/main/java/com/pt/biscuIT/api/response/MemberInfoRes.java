package com.pt.biscuIT.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class MemberInfoRes {
    public String nickname;
    public String job;
    public int period;
    public List<String> interests;
}