package com.pt.biscuIT.db.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import org.springframework.data.redis.core.index.Indexed;


@Getter
@RedisHash("memberRefreshToken")
public class MemberRefreshToken {
    @Id
    private String identifier;

    @Indexed // 필드 값으로 데이터 찾을 수 있게 하는 어노테이션(findByRefreshToken)
    private String refreshToken;

    @TimeToLive
    private Long expiration; // seconds

    @Builder
    public MemberRefreshToken(String refreshToken, String identifier, Long expiration) {
        this.refreshToken = refreshToken;
        this.identifier = identifier;
        this.expiration = expiration;
    }

}
