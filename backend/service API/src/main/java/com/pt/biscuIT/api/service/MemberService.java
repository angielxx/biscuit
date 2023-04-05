package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.history.MemberGraphDto;
import com.pt.biscuIT.api.dto.history.MemberHistoryDto;
import com.pt.biscuIT.api.dto.member.MemberInfoDto;
import com.pt.biscuIT.db.entity.Category;
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

    MemberInterest saveMemberInterest(MemberInterest memberInterest);

    List<Category> getInterestList(Member member);

    MemberProfile getMemberProfileByMemberId(Long id);

    void updateMemberInfo(MemberInfoDto memberInfoDto);

    void updateProfile(MemberProfile profile);
}
