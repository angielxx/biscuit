package com.pt.biscuIT.common.exception;

import com.pt.biscuIT.common.model.response.BaseResponseBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AuthExceptionHandler {

    @ExceptionHandler({UsernameNotFoundException.class})
    protected ResponseEntity<BaseResponseBody> handleUsernameNotFoundException(UsernameNotFoundException e) {
        e.printStackTrace();
        return new ResponseEntity<>(BaseResponseBody.of(HttpStatus.UNAUTHORIZED.value(), e.getMessage()), HttpStatus.UNAUTHORIZED);
    }
}
