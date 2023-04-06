package com.pt.biscuIT.api.response;

import com.pt.biscuIT.api.dto.history.MemberGraphDto;
import com.pt.biscuIT.api.dto.history.MemberHistoryDto;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MemberDashboardRes extends BaseResponseBody {
    private List<MemberHistoryDto> histories;

    private List<MemberGraphDto> graphs;
    private Integer point;

    public static MemberDashboardRes of(Integer status, String message, MemberDashboardRes memberDashboardRes) {
        memberDashboardRes.setMessage(message);
        memberDashboardRes.setStatus(status);
        memberDashboardRes.setHistories(memberDashboardRes.getHistories());
        memberDashboardRes.setGraphs(memberDashboardRes.getGraphs());
        return memberDashboardRes;
    }
}
