package com.pt.biscuIT.common.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;
import com.pt.biscuIT.db.entity.MemberRefreshToken;
import com.pt.biscuIT.db.repository.MemberRefreshTokenRedisRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

/**
 * jwt 토큰 유틸 정의.
 */
@RequiredArgsConstructor
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
    public static final String ACCESS_TOKEN = "access-token";
    public static final String REFRESH_TOKEN = "refresh-token";

    private static MemberRefreshTokenRedisRepository memberRefreshTokenRedisRepository;

    @Autowired
    public JwtTokenUtil(MemberRefreshTokenRedisRepository memberRefreshTokenRedisRepository
            , @Value("${jwt.secret}") String secretKey
            , @Value("${jwt.expiration.atk}") Integer atkExpirationTime,@Value("${jwt.expiration.rtk}") Integer rtkExpirationTime) {
        JwtTokenUtil.memberRefreshTokenRedisRepository = memberRefreshTokenRedisRepository;
        this.secretKey = secretKey;
        this.atkExpirationTime = atkExpirationTime;
        this.rtkExpirationTime = rtkExpirationTime;
    }


    public static JWTVerifier getVerifier() {
        return JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }

    public boolean verifyToken(String token) {
        String tokenWithoutPrefix = token.replace(TOKEN_PREFIX, "");
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(secretKey.getBytes())
                    .parseClaimsJws(tokenWithoutPrefix);
            return claims.getBody()
                    .getExpiration()
                    .after(new Date());
        } catch (ExpiredJwtException e) {
            throw new TokenExpiredException("Token is expired");
        } catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }

    public static String createToken(String tokenType, String identifier) {
        int expirationTime = (tokenType.equals(ACCESS_TOKEN)) ? atkExpirationTime : rtkExpirationTime;

        Date expires = JwtTokenUtil.getTokenExpiration(expirationTime);
        String token = JWT.create()
                .withSubject(identifier)
                .withExpiresAt(expires)
                .withIssuer(ISSUER)
                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .sign(Algorithm.HMAC512(secretKey.getBytes()));
        if (tokenType.equals(REFRESH_TOKEN)) {
            MemberRefreshToken memberRefreshToken = MemberRefreshToken.builder()
                    .identifier(identifier)
                    .refreshToken(token)
                    .build();
            memberRefreshTokenRedisRepository.save(memberRefreshToken);
        }
        return token;
    }

    public static String refreshToken(String refreshToken) {
        String identifier = JwtTokenUtil.getIdentifier(refreshToken);
        return JwtTokenUtil.createToken(REFRESH_TOKEN, identifier);
    }

    public String findrefreshTokenByToken(String refreshToken) {
        return memberRefreshTokenRedisRepository.findByRefreshToken(refreshToken).getRefreshToken();
    }

    public String findrefreshTokenByIdentifier(String identifier) {
        return memberRefreshTokenRedisRepository.findByIdentifier(identifier).getRefreshToken();
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
        String token = Token.replace(TOKEN_PREFIX, "");
        Date expiration = Jwts.parser()
                .setSigningKey(secretKey.getBytes())
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();

        Long now = new Date().getTime();
        return (expiration.getTime() - now);
    }

    public static String getIdentifier(String Token){
        String token = Token.replace(TOKEN_PREFIX, "");
        String identifier = Jwts.parser()
                .setSigningKey(secretKey.getBytes())
                .parseClaimsJws(token)
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
        } catch (AlgorithmMismatchException | InvalidClaimException | SignatureVerificationException |
                 TokenExpiredException | JWTCreationException | JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
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