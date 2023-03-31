package com.pt.biscuIT.api.dto.member;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.pt.biscuIT.db.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 부가 상세정보(활성화 여부, 만료, 롤 등) 정의.
 */
@Getter
@RequiredArgsConstructor
public class MemberAuthDto implements OAuth2User {
    Member member;
    Map<String, Object> attributes;
    List<GrantedAuthority> roles = new ArrayList<>();

    public MemberAuthDto(Member member, Map<String, Object> attributes) {
        this.member = member;
        this.attributes = attributes;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }
    public void setAuthorities(List<GrantedAuthority> roles) {
        this.roles = roles;
    }

    @Override
    public String getName() {
        return null;
    }
}