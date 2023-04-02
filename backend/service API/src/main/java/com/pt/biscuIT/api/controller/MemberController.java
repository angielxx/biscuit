package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.api.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {
    MemberService memberService;

    @GetMapping("/")
    public ResponseEntity<?> getMemberByEmail(String email) {
        return ResponseEntity.ok(memberService.findMemberByEmail(email));
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody String tokens) {
        System.out.println(tokens);
        return ResponseEntity.ok().build();
    }
}
