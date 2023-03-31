package com.pt.biscuIT.config;

import com.pt.biscuIT.api.service.AuthService;
import com.pt.biscuIT.api.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Spring Security 설정
 */
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
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

    private AuthService authService;

    private MemberService memberService;

//    인증 필요 없는뎅
//    @Bean
//    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
//        return authenticationConfiguration.getAuthenticationManager();
//    }
//
//    // DAO 기반으로 Authentication Provider를 생성
//    // BCrypt Password Encoder와 UserDetailService 구현체를 설정
//    @Bean
//    DaoAuthenticationProvider authenticationProvider() {
//        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
//        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
//        daoAuthenticationProvider.setUserDetailsService(this.authService);
//        return daoAuthenticationProvider;
//    }

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .httpBasic().disable()
//                .csrf().disable()
//                    .and()
//                .authorizeRequests()
//                .antMatchers(HttpMethod.GET, OPEN_API_GET).permitAll()
//                .antMatchers(HttpMethod.POST, OPEN_API_POST).permitAll()
//                .anyRequest().authenticated()
//                    .and()
//                .oauth2Login()          // OAuth2기반의 로그인인 경우
//                .userInfoEndpoint()     // OAuth2 로그인 성공 이후 사용자 정보를 가져올 때의 설정들을 담당
//                .userService(authService)  // 소셜 로그인 성공 시 후속 조치를 진행할 UserService 인터페이스의 구현체를 등록
//                .and().cors();

        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음
                .and()
//                .addFilter(new JwtAuthenticationFilter(authenticationManager(), memberService)) //HTTP 요청에 JWT 토큰 인증 필터를 거치도록 필터를 추가
                .authorizeRequests()
                .anyRequest().permitAll()
                .and().cors();
        return http.build();
    }
}