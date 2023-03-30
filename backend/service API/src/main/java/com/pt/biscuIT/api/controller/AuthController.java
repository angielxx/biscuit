package com.pt.biscuIT.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/callback/{provider}")
    public void signIn(@RequestParam String code, @PathVariable String provider) {
        log.info("code: " + code);
        log.info("provider: " + provider);
    }



}
