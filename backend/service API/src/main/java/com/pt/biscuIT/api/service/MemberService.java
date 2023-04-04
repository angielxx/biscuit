package com.pt.biscuIT.api.service;

import com.pt.biscuIT.db.entity.Member;

public interface MemberService {
    Member findByIdentifier(String identifier);

    Member update(Member member);
}
