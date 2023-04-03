package com.pt.biscuIT.common.exception;

public class MemberNotFoundException extends RuntimeException{
    public MemberNotFoundException() {
        super("존재하지 않는 회원입니다.");
    }

    public MemberNotFoundException(String message) {
        super(message);
    }

    public MemberNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
