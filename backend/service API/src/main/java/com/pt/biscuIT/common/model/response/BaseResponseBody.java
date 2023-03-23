package com.pt.biscuIT.common.model.response;

import lombok.Getter;
import lombok.Setter;

/*
    * BaseResponseBody
    * @author 7unho
    * @since 2020-11-23
    *
 */
@Getter
@Setter
public class BaseResponseBody {
    String message = null;
    Integer statusCode = null;

    public BaseResponseBody() {}

    public BaseResponseBody(Integer statusCode){
        this.statusCode = statusCode;
    }

    public BaseResponseBody(Integer statusCode, String message){
        this.statusCode = statusCode;
        this.message = message;
    }

    public static BaseResponseBody of(Integer statusCode, String message) {
        BaseResponseBody body = new BaseResponseBody();
        body.message = message;
        body.statusCode = statusCode;
        return body;
    }
}