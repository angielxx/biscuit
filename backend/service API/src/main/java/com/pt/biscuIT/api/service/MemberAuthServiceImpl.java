package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.member.OAuth2UserInfo;
import com.pt.biscuIT.api.dto.member.OAuthAttributes;
import com.pt.biscuIT.common.exception.MemberNotFoundException;
import com.pt.biscuIT.common.util.JwtTokenUtil;
import com.pt.biscuIT.db.entity.*;
import com.pt.biscuIT.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;


/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 상세정보(활성화 여부, 만료, 롤 등) 관련 서비스 정의.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class MemberAuthServiceImpl implements MemberAuthService {
    private final MemberRepository memberRepository;
    private final MemberBookmarkRepository memberBookmarkRepository;
    private final MemberHistoryRepository memberHistoryRepository;
    private final MemberInterestRepository memberInterestRepository;
    private final MemberPointRepository memberPointRepository;
    private final MemberProfileRepository memberProfileRepository;
    private final MemberSubmissionRepository memberSubmissionRepository;
    private final JwtTokenUtil jwtTokenUtil;

//    public MemberAuthDto loadMemberByEmail(String email) {
//        Member member = memberService.getMemberByEmail(email);
//        if(member != null) {
//            return new MemberAuthDto(member);
//        }
//        return null;
//    }

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // OAuth2 서비스 제공자 구분
        String provider = userRequest.getClientRegistration().getRegistrationId();

        // OAuth2 계정 정보 가져오기
        DefaultOAuth2UserService oAuth2UserService = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        OAuthAttributes oAuthAttributes = OAuthAttributes.of(provider, userNameAttributeName, attributes);
        log.info("oAuthAttributes: {}", oAuthAttributes);

        Member member = saveOrUpdate(provider, oAuthAttributes.getOAuth2UserInfo());
        log.debug("member: {}", member.toString());
        
        // TODO CustonOAuth2User으로 바꿔서 쿼리 한번 덜 날리게 리팩토링
        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(member.getRole().toString())),
                oAuthAttributes.getOAuth2UserInfo().getAttributes(),
                oAuthAttributes.getUserNameAttributeName()
        );
    }

    @Transactional
    public Member saveOrUpdate(String provider, OAuth2UserInfo oAuth2UserInfo) {

        Member oAuthMember = Member.builder()
                .identifier(oAuth2UserInfo.getId())
                .email(oAuth2UserInfo.getEmail())
                .provider(Provider.valueOf(provider.toUpperCase()))
                .role(Role.ROLE_NEWBIE)
                .build();

        Optional<Member> findMember =  memberRepository.findByIdentifier(oAuthMember.getIdentifier());
        log.debug("oAuthMember.getIdentifier: {}", oAuthMember.getIdentifier());
        Member member;
        if (findMember.isPresent()) {
            log.info("findMember.isPresent: 이미 회원가입한 적 있는 회원입니다.");
            member = memberRepository.save(new Member(findMember.get(), oAuthMember.getEmail()));
        } else {
            log.info("findMember.isNOTPresent: 회원가입한 적 없는 회원입니다.");
            member = memberRepository.save(oAuthMember);
            memberProfileRepository.save(MemberProfile.builder()
                    .member(member)
                    .build());
        }
        log.debug("member: {}", member.toString());
        return member;
    }

    @Override
    public Member getMember(String token) {
        String identifier = JwtTokenUtil.getIdentifier(token);
        Optional<Member> findMember = memberRepository.findByIdentifier(identifier);
        if (findMember.isPresent()) {
            return findMember.get();
        } else{
            throw new MemberNotFoundException();
        }
    }

}
