package com.pt.biscuIT.api.dto.member;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class Tokens {
    private String accessToken;
    private String refreshToken;
}
