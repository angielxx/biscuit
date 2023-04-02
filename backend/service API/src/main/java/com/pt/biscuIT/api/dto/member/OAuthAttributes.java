package com.pt.biscuIT.api.dto.member;

import lombok.*;

import java.util.Map;


/**
 * OAuth2 로그인 시 사용자 정보를 담을 클래스
 * 소셜별로 데이터를 받는 데이터를 분기 처리
 */
@Getter
@Builder
public class OAuthAttributes {

    private String userNameAttributeName;
    private OAuth2UserInfo oAuth2UserInfo;
    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        if ("google".equals(registrationId)) {
            return ofGoogle(userNameAttributeName, attributes);
        } else if ("github".equals(registrationId)) {
            return ofGithub(userNameAttributeName, attributes);
        }
        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .userNameAttributeName(userNameAttributeName)
                .oAuth2UserInfo(new GoogleOAuth2UserInfo(attributes))
                .build();
    }

    private static OAuthAttributes ofGithub(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .userNameAttributeName(userNameAttributeName)
                .oAuth2UserInfo(new GithubOAuth2UserInfo(attributes))
                .build();
    }

}
