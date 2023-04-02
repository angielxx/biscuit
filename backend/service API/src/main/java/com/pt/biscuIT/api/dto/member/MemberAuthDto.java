package com.pt.biscuIT.api.dto.member;

import com.pt.biscuIT.db.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

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

    public MemberAuthDto(Member member) {
        super();
        this.member = member;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    /**
     * 해당 유저의 권한 목록 리턴
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        roles.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return member.getRole().toString();
            }
        });
        return roles;
    }

    @Override
    public String getName() {
        return null;
    }
}