package com.pt.biscuIT.config;

import com.pt.biscuIT.api.service.AuthService;
import com.pt.biscuIT.api.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

/**
 * Spring Security 설정
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    // 인증이 필요없는 API 목록
    private static String[] OPEN_API_GET = new String[] {
            "/api/auth/**",
            "/api/contents/**",
            "/api/search",
            "/api/categories",
            "/api/recommends/random/**",
    };

    private static String[] OPEN_API_POST = new String[] {
            "/api/auth/signin/**",
    };

    private final AuthService authService;
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
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, OPEN_API_GET).permitAll()
                .antMatchers(HttpMethod.POST, OPEN_API_POST).permitAll()
                .anyRequest().authenticated()
                .and().cors()
                    .and()
                .oauth2Login()          // OAuth2기반의 로그인인 경우
                .userInfoEndpoint()     // OAuth2 로그인 성공 이후 사용자 정보를 가져올 때의 설정들을 담당
                .userService(authService)  // 소셜 provider에서 인가 성공 시 후속 조치를 진행할 OAuth2UserService 인터페이스의 구현체를 등록
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
        return http.build();
    }
}