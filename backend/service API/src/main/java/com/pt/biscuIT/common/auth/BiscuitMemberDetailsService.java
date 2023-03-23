package com.pt.biscuIT.common.auth;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.pt.biscuIT.api.service.MemberService;
import com.pt.biscuIT.db.entity.Member;


/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 상세정보(활성화 여부, 만료, 롤 등) 관련 서비스 정의.
 */
@Component
public class BiscuitMemberDetailsService implements UserDetailsService {
    @Autowired
    MemberService memberService;

    public BiscuitMemberDetails loadMemberByEmail(String email) {
        Member member = memberService.getMemberByEmail(email);
        if(member != null) {
            BiscuitMemberDetails memberDetails = new BiscuitMemberDetails(member);
            return memberDetails;
        }
        return null;
    }

    @Override
    public BiscuitMemberDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return loadMemberByEmail(email);
    }
}
