package com.pt.biscuIT.api.service;

import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.repository.MemberRepositorySupport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 회원 관련 서비스 정의.
  * author:
  * date:
 */

@Slf4j
@RequiredArgsConstructor
@Service("memberService")
public class MemberService {
    MemberRepositorySupport memberRepositorySupport;

    public Member getMemberByEmail(String email) {
        return memberRepositorySupport.findByEmail(email);
    }
}
