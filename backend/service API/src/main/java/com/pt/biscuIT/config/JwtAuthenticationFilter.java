package com.pt.biscuIT.config;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.pt.biscuIT.api.dto.member.MemberAuthDto;
import com.pt.biscuIT.api.service.MemberService;
import com.pt.biscuIT.common.util.JwtTokenUtil;
import com.pt.biscuIT.db.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


/**
 * 요청 헤더에 jwt 토큰이 있는 경우, 토큰 검증 및 인증 처리 로직 정의.
 */
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final MemberService memberService;
    private final JwtTokenUtil tokenUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {// Read the Authorization header, where the JWT Token should be
            String token = ((HttpServletRequest) request).getHeader(JwtTokenUtil.HEADER_STRING);
            if (token != null && tokenUtil.verifyToken(token)) {
                String identifier = JwtTokenUtil.getIdentifier(token);

                Member member = memberService.findByIdentifier(identifier);
                log.debug("member : {}", member);
                Authentication auth = getAuthentication((HttpServletRequest) request);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            log.error("JwtAuthenticationFilter error : {}", e.getMessage());
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            // TODO TokenExceptionRes로 바꿔줘......
            response.getWriter().write("Authentication failed: " + e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(JwtTokenUtil.HEADER_STRING);
        // 요청 헤더에 Authorization 키값에 jwt 토큰이 포함된 경우에만, 토큰 검증 및 인증 처리 로직 실행.
            // parse the token and validate it (decode)
            JWTVerifier verifier = JwtTokenUtil.getVerifier();
            JwtTokenUtil.handleError(token);
            DecodedJWT decodedJWT = verifier.verify(token.replace(JwtTokenUtil.TOKEN_PREFIX, ""));
            String identifier = decodedJWT.getSubject();

            // Search in the DB if we find the user by token subject (username)
            // If so, then grab user details and create spring auth token using username, pass, authorities/roles
            if (identifier != null) {
                // jwt 토큰에 포함된 계정 정보(userId) 통해 실제 디비에 해당 정보의 계정이 있는지 조회.
                Member member = memberService.findByIdentifier(identifier);
                if(member != null) {
                    // 식별된 정상 유저인 경우, 요청 context 내에서 참조 가능한 인증 정보(jwtAuthentication) 생성.
                    MemberAuthDto memberDetails = new MemberAuthDto(member);
                    UsernamePasswordAuthenticationToken jwtAuthentication = new UsernamePasswordAuthenticationToken(identifier,
                            null, memberDetails.getAuthorities());
                    jwtAuthentication.setDetails(memberDetails);
                    return jwtAuthentication;
                }
            }
        return null;
    }
//    AbstractAuthenticationProcessingFilter
}