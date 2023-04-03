package com.pt.biscuIT.common.util;

import com.pt.biscuIT.api.dto.member.MemberRefreshToken;
import com.pt.biscuIT.db.repository.MemberRefreshTokenRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.pt.biscuIT.common.util.JwtTokenUtil.ACCESS_TOKEN;
import static com.pt.biscuIT.common.util.JwtTokenUtil.REFRESH_TOKEN;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

//    private String clientUrl = "http://localhost:5173";
    private String clientUrl = "https://j8a706.p.ssafy.io";
    MemberRefreshTokenRedisRepository memberRefreshTokenRedisRepository;
//    private RequestCache requestCache = new HttpSessionRequestCache();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//        // SavedRequestAwareAuthenticationSuccessHandler 로직
//        SavedRequest savedRequest = this.requestCache.getRequest(request, response);
//        if (savedRequest == null) {
//            super.onAuthenticationSuccess(request, response, authentication);
//            return;
//        }
//        String targetUrlParameter = getTargetUrlParameter();
//        if (isAlwaysUseDefaultTargetUrl()
//                || (targetUrlParameter != null && StringUtils.hasText(request.getParameter(targetUrlParameter)))) {
//            this.requestCache.removeRequest(request, response);
//            super.onAuthenticationSuccess(request, response, authentication);
//            return;
//        }
//        clearAuthenticationAttributes(request);
//        // Use the DefaultSavedRequest URL
//        String targetUrl = savedRequest.getRedirectUrl();

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        OAuth2AuthenticationToken oAuth2AuthenticationToken = (OAuth2AuthenticationToken) authentication;

        String accesstoken = JwtTokenUtil.createToken(ACCESS_TOKEN, oAuth2AuthenticationToken.getAuthorizedClientRegistrationId() + oAuth2User.getName());
        String refreshtoken = JwtTokenUtil.createToken(REFRESH_TOKEN, oAuth2AuthenticationToken.getAuthorizedClientRegistrationId() + oAuth2User.getName());
        MemberRefreshToken memberRefreshToken = new MemberRefreshToken(oAuth2AuthenticationToken.getAuthorizedClientRegistrationId() + oAuth2User.getName(), refreshtoken, JwtTokenUtil.getExpiration(refreshtoken));
//        memberRefreshTokenRedisRepository.save(memberRefreshToken);
        response.addHeader(ACCESS_TOKEN, accesstoken);
        response.addHeader(REFRESH_TOKEN, refreshtoken);
        response.addCookie(CookieUtil.createCookie(clientUrl, ACCESS_TOKEN, accesstoken));
        response.addCookie(CookieUtil.createCookie(clientUrl, REFRESH_TOKEN, refreshtoken));
        getRedirectStrategy().sendRedirect(request, response, clientUrl + "/login/oauth2/redirect");
//        getRedirectStrategy().sendRedirect(request, response, clientUrl + "/");
    }


}
