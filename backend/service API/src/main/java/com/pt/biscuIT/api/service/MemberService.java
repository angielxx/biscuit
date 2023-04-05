package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.history.MemberGraphDto;
import com.pt.biscuIT.api.dto.history.MemberHistoryDto;
import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.entity.MemberInterest;
import com.pt.biscuIT.db.entity.MemberProfile;

import java.util.List;

public interface MemberService {
    Member findByIdentifier(String identifier);

    Member update(Member member);
    List<MemberHistoryDto> getHistoriesByMember(Member member);
    List<MemberGraphDto> getGraphsByMember(Member member);
    Integer getPointByMember(Member member);

    MemberProfile updateProfile(MemberProfile profile);

    MemberInterest saveMemberInterest(MemberInterest memberInterest);

    void updateNickName(Member member, String nickname);

    void updateRole(Member member, String roleUser);
}
