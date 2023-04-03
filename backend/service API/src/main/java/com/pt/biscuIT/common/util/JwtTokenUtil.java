package com.pt.biscuIT.common.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

/**
 * jwt 토큰 유틸 정의.
 */
@Component
public class JwtTokenUtil {
    @Value("${jwt.secret}")
    private static String secretKey;
    @Value("${jwt.expiration.atk}")
    public static Integer atkExpirationTime;
    @Value("${jwt.expiration.rtk}")
    public static Integer rtkExpirationTime;
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String ISSUER = "biscuit";
    public static final String ACCESS_TOKEN_NAME = "access-token";
    public static final String REFRESH_TOKEN_NAME = "refresh-token";

    @Autowired
    public JwtTokenUtil(@Value("${jwt.secret}") String secretKey, @Value("${jwt.expiration.atk}") Integer atkExpirationTime, @Value("${jwt.expiration.rtk}") Integer rtkExpirationTime) {
        this.secretKey = secretKey;
        this.atkExpirationTime = atkExpirationTime;
        this.rtkExpirationTime = rtkExpirationTime;
    }


    public void setExpirationTime() {
        //JwtTokenUtil.expirationTime = Integer.parseInt(expirationTime);
        JwtTokenUtil.rtkExpirationTime = rtkExpirationTime;
    }

    public static JWTVerifier getVerifier() {
        return JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }

    public static String createToken(String type, String identifier) {
        int expirationTime = (type.equals(ACCESS_TOKEN_NAME)) ? atkExpirationTime : rtkExpirationTime;

        Date expires = JwtTokenUtil.getTokenExpiration(expirationTime);
        return JWT.create()
                .withSubject(identifier)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
    }

//    public static String getToken(int expiresToken, String identifier) {
//        Date expires = JwtTokenUtil.getTokenExpiration(expiresToken);
//        return JWT.create()
//                .withSubject(identifier)
//                .withExpiresAt(expires)
//                .withIssuer(ISSUER)
//                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
//                .sign(Algorithm.HMAC512(secretKey.getBytes()));
//    }

    public static Date getTokenExpiration(int expirationTime) {
        Date now = new Date();
        return new Date(now.getTime() + expirationTime);
    }

    public static Long getExpiration(String Token){
        Date expiration = Jwts.parser()
                .setSigningKey(secretKey.getBytes())
                .parseClaimsJws(Token)
                .getBody()
                .getExpiration();

        Long now = new Date().getTime();
        return (expiration.getTime() - now);
    }

    public static String getIdentifier(String Token){
        String identifier = Jwts.parser()
                .setSigningKey(secretKey.getBytes())
                .parseClaimsJws(Token)
                .getBody().getSubject();
        return identifier;
    }

    public static void handleError(String token) {
        JWTVerifier verifier = JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();

        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (JWTCreationException | JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }

    public static void handleError(JWTVerifier verifier, String token) {
        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException | InvalidClaimException | SignatureVerificationException |
                 JWTCreationException | TokenExpiredException | JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }
}