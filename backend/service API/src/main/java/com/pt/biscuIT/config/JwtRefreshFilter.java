package com.pt.biscuIT.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pt.biscuIT.api.dto.member.Tokens;
import com.pt.biscuIT.common.util.JwtTokenUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.util.StreamUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
public class JwtRefreshFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;
    private final ObjectMapper objectMapper;
    private final RequestMatcher requestMatcher;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if (requestMatcher.matches(request)) {
            ServletInputStream is = request.getInputStream();
            String body = StreamUtils.copyToString(is, StandardCharsets.UTF_8);
            JsonNode jsonNode = objectMapper.readTree(body);

            try {
                String refreshToken = jsonNode.get("refreshToken").asText();

                boolean isVerified = jwtTokenUtil.verifyToken(refreshToken);

                Long exp = jwtTokenUtil.getExpiration(refreshToken);
                String identifier = jwtTokenUtil.getIdentifier(refreshToken);

                String findRefreshToken = jwtTokenUtil.findrefreshTokenByIdentifier(identifier);

                String newAccessToken = jwtTokenUtil.createToken(jwtTokenUtil.ACCESS_TOKEN,identifier);
                String newRefreshToken = jwtTokenUtil.refreshToken(refreshToken);

                // 성공 시의 응답
                response.setStatus(HttpStatus.OK.value());
                response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
                response.setHeader(HttpHeaders.CONTENT_ENCODING, "UTF-8");

                Tokens newTokens = Tokens.builder().accessToken(newAccessToken).refreshToken(newRefreshToken).build();

                response.getWriter().write(objectMapper.writeValueAsString(newTokens));

                // 요청 본문에 토큰이 없거나 토큰 자체의 문제가 있는 경우 또는 DB 에 없는 리프레쉬 토큰의 경우 예외 처리 핸들러에서 응답 처리
            } catch (NullPointerException e) {
                e.printStackTrace();
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }

}