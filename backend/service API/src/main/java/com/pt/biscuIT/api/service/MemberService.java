package com.pt.biscuIT.api.service;

import com.pt.biscuIT.db.entity.Member;

public interface MemberService {
    Member findMemberByIdentifier(String identifier);

    Member update(Member member);
}
