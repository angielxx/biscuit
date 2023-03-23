package com.pt.biscuIT.api.service;

import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.repository.MemberRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 회원 관련 서비스 정의.
  * author:
  * date:
 */

@Service("memberService")
public class MemberService {
    @Autowired
    MemberRepositorySupport memberRepositorySupport;

    public Member getMemberByEmail(String email) {
        return memberRepositorySupport.findByEmail(email);
    }
}
