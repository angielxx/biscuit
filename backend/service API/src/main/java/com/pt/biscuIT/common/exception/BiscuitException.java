package com.pt.biscuIT.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class BiscuitException extends RuntimeException {
    private final ErrorCode errorCode;
}
