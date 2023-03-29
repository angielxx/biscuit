package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.member.MemberAuthDto;
import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.pt.biscuIT.db.entity.Member;


/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 상세정보(활성화 여부, 만료, 롤 등) 관련 서비스 정의.
 */
@Component
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {
    MemberService memberService;

    public MemberAuthDto loadMemberByEmail(String email) {
        Member member = memberService.getMemberByEmail(email);
        if(member != null) {
            return new MemberAuthDto(member);
        }
        return null;
    }

    @Override
    public MemberAuthDto loadUserByUsername(String email) throws UsernameNotFoundException {
        return loadMemberByEmail(email);
    }
}
