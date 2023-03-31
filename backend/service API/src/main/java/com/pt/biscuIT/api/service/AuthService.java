package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.member.MemberAuthDto;
import com.pt.biscuIT.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import com.pt.biscuIT.db.entity.Member;


/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 상세정보(활성화 여부, 만료, 롤 등) 관련 서비스 정의.
 */
@Component
@RequiredArgsConstructor
public class AuthService implements OAuth2UserService {
    private MemberRepository memberRepository;

//    public MemberAuthDto loadMemberByEmail(String email) {
//        Member member = memberService.getMemberByEmail(email);
//        if(member != null) {
//            return new MemberAuthDto(member);
//        }
//        return null;
//    }

    public MemberAuthDto loadMemberByEmail(String email) throws UsernameNotFoundException {
        return loadMemberByEmail(email);
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        return null;
    }

}
