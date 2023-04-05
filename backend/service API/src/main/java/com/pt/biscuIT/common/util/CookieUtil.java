package com.pt.biscuIT.common.util;


import javax.servlet.http.Cookie;

public class CookieUtil {

    public static Cookie createCookie(String clientUrl, String name, String value) {
        Cookie cookie = new Cookie(name, value);
//        cookie.setDomain(clientUrl);
//        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setSecure(true);
        cookie.setMaxAge(3600);
        return cookie;
    }
}
