package com.pt.biscuIT.common.exception;


import com.pt.biscuIT.common.model.response.BaseResponseBody;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.FileNotFoundException;
import java.io.IOException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({BiscuitException.class})
    protected ResponseEntity<BaseResponseBody> handleBiscuitException(BiscuitException e) {
        return new ResponseEntity<>(BaseResponseBody.of(e.getErrorCode().getStatus().value(), e.getErrorCode().getMessage()), HttpStatus.valueOf(e.getErrorCode().getStatus().value()));
    }

//    @ExceptionHandler({Exception.class})
//    protected ResponseEntity handleException(Exception e) {
//        return new ResponseEntity(BaseResponseBody.of(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
//    }

    @ExceptionHandler({UnsupportedOperationException.class})
    protected ResponseEntity<BaseResponseBody> handleUnsupportedOperationException(UnsupportedOperationException e) {
        e.printStackTrace();
        return new ResponseEntity<>(BaseResponseBody.of(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({FileNotFoundException.class})
    protected ResponseEntity<BaseResponseBody> handleFileNotFoundException(FileNotFoundException e) {
        e.printStackTrace();
        return new ResponseEntity<>(BaseResponseBody.of(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({IOException.class})
    protected ResponseEntity<BaseResponseBody> handleIOException(IOException e) {
        e.printStackTrace();
        return new ResponseEntity<>(BaseResponseBody.of(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
