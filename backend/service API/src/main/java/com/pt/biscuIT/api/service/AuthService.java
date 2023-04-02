package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.member.OAuth2UserInfo;
import com.pt.biscuIT.api.dto.member.OAuthAttributes;
import com.pt.biscuIT.db.entity.Provider;
import com.pt.biscuIT.db.entity.Role;
import com.pt.biscuIT.db.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import com.pt.biscuIT.db.entity.Member;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;


/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 상세정보(활성화 여부, 만료, 롤 등) 관련 서비스 정의.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService implements OAuth2UserService {
    private final MemberRepository memberRepository;

//    public MemberAuthDto loadMemberByEmail(String email) {
//        Member member = memberService.getMemberByEmail(email);
//        if(member != null) {
//            return new MemberAuthDto(member);
//        }
//        return null;
//    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        DefaultOAuth2UserService oAuth2UserService = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        OAuthAttributes oAuthAttributes = OAuthAttributes.of(provider, userNameAttributeName, attributes);
        log.info("oAuthAttributes: {}", oAuthAttributes);

        Member member = saveOrUpdate(provider, oAuthAttributes.getOAuth2UserInfo());
        log.debug("member: {}", member.toString());
        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(member.getRole().toString())),
                oAuthAttributes.getOAuth2UserInfo().getAttributes(),
                oAuthAttributes.getUserNameAttributeName()
        );
    }

    public Member saveOrUpdate(String provider, OAuth2UserInfo oAuth2UserInfo) {

        Member oAuthMember = Member.builder()
                .identifier(oAuth2UserInfo.getId())
                .email(oAuth2UserInfo.getEmail())
                .provider(Provider.valueOf(provider.toUpperCase()))
                .role(Role.MEMBER)
                .build();

        Optional<Member> findMember =  memberRepository.findByIdentifier(oAuthMember.getIdentifier());
        Member member;
        if (findMember.isPresent()) {
            findMember.get().setEmail(oAuthMember.getEmail());
            member = memberRepository.save(findMember.get());
        } else {
            member = memberRepository.save(oAuthMember);
        }

        return member;
    }

}
