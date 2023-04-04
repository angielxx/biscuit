package com.pt.biscuIT.api.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokenExceptionRes {
    private String message;
    private String code;

    public TokenExceptionRes(String message, String code) {
        this.message = message;
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public String getCode() {
        return code;
    }
}
