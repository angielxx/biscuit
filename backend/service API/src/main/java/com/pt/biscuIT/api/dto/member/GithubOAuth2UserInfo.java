package com.pt.biscuIT.api.dto.member;

import java.util.Map;

public class GithubOAuth2UserInfo extends OAuth2UserInfo{
    public GithubOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("id");
    }

    @Override
    public String getNickname() {
        return (String) attributes.get("login");
        //TODO: Github에서 제공하는 nickname이 없음. login을 nickname으로 사용 맞는지 확인 필요
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }
}
