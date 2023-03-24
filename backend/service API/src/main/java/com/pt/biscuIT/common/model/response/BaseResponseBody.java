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
    Integer status = null;

    public BaseResponseBody() {}

    public BaseResponseBody(Integer status){
        this.status = status;
    }

    public BaseResponseBody(Integer status, String message){
        this.status = status;
        this.message = message;
    }

    public static BaseResponseBody of(Integer status, String message) {
        BaseResponseBody body = new BaseResponseBody();
        body.message = message;
        body.status = status;
        return body;
    }
}