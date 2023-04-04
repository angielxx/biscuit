package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.api.service.MemberAuthService;
import com.pt.biscuIT.api.service.MemberService;
import com.pt.biscuIT.db.entity.Member;
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
    MemberAuthService memberAuthService;

    @GetMapping("/")
    public ResponseEntity<?> getMemberByEmail(String email) {
        return ResponseEntity.ok().build();
    }

    /**
     * 회원 정보 조회
     * @param token
     * @return
     */
    @PostMapping("/onboarding")
    public ResponseEntity<?> onboard(@RequestHeader(required = false, value = "Authorization") String token) {
        Member member = memberAuthService.getMember(token);

        memberService.update(member);
        return ResponseEntity.ok().build();
    }

}
