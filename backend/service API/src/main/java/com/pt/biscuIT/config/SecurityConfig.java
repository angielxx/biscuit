package com.pt.biscuIT.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pt.biscuIT.api.service.MemberAuthService;
import com.pt.biscuIT.api.service.MemberService;
import com.pt.biscuIT.common.util.FilterSkipMatcher;
import com.pt.biscuIT.common.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.Filter;
import java.util.List;

/**
 * Spring Security 설정
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    // 인증이 필요없는 API 목록
    private static final String[] OPEN_API_GET = new String[] {
            "/api/auth/**",
            "/api/contents/**",
            "/api/search/**",
            "/api/categories/**",
            "/api/recommends/random/**",
            "/api/quizzes/**",
            "/login/**",
            "/oauth2/**",
    };

    private static final String[] OPEN_API_POST = new String[] {
            "/api/auth/signin/**",
            "/api/contents/**/feedback",
    };

    private static final String[] ADMIN_API_POST = new String[] {
            "/api/admin/**",
    };

    private final MemberAuthService memberAuthService;
    private final MemberService memberService;
    private final JwtTokenUtil jwtTokenUtil;
    private final ObjectMapper objectMapper;
    private final SavedRequestAwareAuthenticationSuccessHandler successHandler;

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, OPEN_API_GET).permitAll()
                .antMatchers(HttpMethod.POST, OPEN_API_POST).permitAll()
                .anyRequest().authenticated()
                .and().cors()
                    .and()
                // OAuth2 로그인 설정
                .oauth2Login()          // OAuth2기반의 로그인인 경우
                .userInfoEndpoint()     // OAuth2 로그인 성공 이후 사용자 정보를 가져올 때의 설정들을 담당
                .userService(memberAuthService)  // 소셜 provider에서 인가 성공 시 후속 조치를 진행할 OAuth2UserService 인터페이스의 구현체를 등록
                    .and()
                .successHandler(successHandler);    // 로그인 성공 시 후속 조치를 진행할 핸들러를 등록

//        http
//                .httpBasic().disable()
//                .csrf().disable()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음
//                .and()
////                .addFilter(new JwtAuthenticationFilter(authenticationManager(), memberService)) //HTTP 요청에 JWT 토큰 인증 필터를 거치도록 필터를 추가
//                .authorizeRequests()
//                .anyRequest().permitAll()
//                .and().cors();
        // JWT Authentication filter chain configuration
        http.addFilterBefore(new JwtAuthenticationFilter(memberService, jwtTokenUtil),
                OAuth2AuthorizationRequestRedirectFilter.class);    // OAuth2AuthorizationRequestRedirectFilter
        http.addFilterBefore(jwtRefreshFilter(), JwtAuthenticationFilter.class);
        return http.build();
    }

    // jwt 갱신 필터
    public Filter jwtRefreshFilter() throws Exception {
        return new JwtRefreshFilter(
                jwtTokenUtil,
                objectMapper,
                new AntPathRequestMatcher("/api/refresh"));
    }
}