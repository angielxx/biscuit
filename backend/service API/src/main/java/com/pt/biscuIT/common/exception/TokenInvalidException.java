package com.pt.biscuIT.common.exception;

public class TokenInvalidException extends RuntimeException{
    public TokenInvalidException() {
        super("유효하지 않은 토큰입니다.");
    }

    public TokenInvalidException(String message) {
        super(message);
    }

    public TokenInvalidException(String message, Throwable cause) {
        super(message, cause);
    }

}
