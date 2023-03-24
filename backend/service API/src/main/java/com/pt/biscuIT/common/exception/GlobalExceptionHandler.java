package com.pt.biscuIT.common.exception;


import com.pt.biscuIT.common.model.response.BaseResponseBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({BiscuitException.class})
    protected ResponseEntity handleBiscuitException(BiscuitException e) {
        return new ResponseEntity(BaseResponseBody.of(e.getErrorCode().getStatus().value(), e.getErrorCode().getMessage()), e.getErrorCode().getStatus());
    }
}
