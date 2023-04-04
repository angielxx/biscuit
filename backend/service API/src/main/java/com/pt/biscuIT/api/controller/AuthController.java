package com.pt.biscuIT.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/login/oauth2/code/{provider}")
    public void signIn(@PathVariable String provider) {
        log.info("provider: " + provider);
    }

    @GetMapping("/login")
    public void login(@PathVariable String provider) {
        log.info("provider: " + provider);
    }

    @GetMapping("/logout")
    public void logout() {
        log.info("logout");
    }

    @GetMapping("/refresh")
    public void refresh() {

        log.info("refresh");
    }

}
