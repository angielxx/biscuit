package com.pt.biscuIT.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    // 400 BAD_REQUEST 잘못된 요청
    INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "파라미터 값을 확인해줭"),

    // 404 NOT_FOUND 존재하지 않는 리소스 접근
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 카테고리입니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 유저입니다."),

    // 200 OK
    CONTENT_NOT_FOUND(HttpStatus.OK, "컨텐츠가 존재하지 않습니다."),

    // 409 CONFLICT 이미 존재하는 리소스 접근
    DUPLICATE_CATEGORY(HttpStatus.CONFLICT, "이미 존재하는 카테고리입니다."),
    DUPLICATE_USER(HttpStatus.CONFLICT, "이미 존재하는 유저입니다."),
    DUPLICATE_CONTENT(HttpStatus.CONFLICT, "이미 존재하는 컨텐츠입니다."),

    // 500 INTERNAL_SERVER_ERROR 서버 내부 오류
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부 오류입니다.");
    private final HttpStatus status;
    private final String message;
}
