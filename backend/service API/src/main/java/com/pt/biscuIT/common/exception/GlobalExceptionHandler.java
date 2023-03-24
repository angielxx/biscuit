package com.pt.biscuIT.common.exception;


import com.pt.biscuIT.common.model.response.BaseResponseBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({BiscuitException.class})
    protected ResponseEntity handleBiscuitException(BiscuitException e) {
        return new ResponseEntity(BaseResponseBody.of(e.getErrorCode().getStatus().value(), e.getErrorCode().getMessage()), HttpStatus.valueOf(e.getErrorCode().getStatus().value()));
    }

    @ExceptionHandler({Exception.class})
    protected ResponseEntity handleException(Exception e) {
        return new ResponseEntity(BaseResponseBody.of(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
