package com.pt.biscuIT.api.service;

import com.pt.biscuIT.db.entity.Member;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;

public interface MemberAuthService extends OAuth2UserService {
    Member getMember(String token);
}
