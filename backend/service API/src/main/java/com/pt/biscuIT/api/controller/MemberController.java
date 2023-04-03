package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.api.dto.history.MemberGraphDto;
import com.pt.biscuIT.api.dto.history.MemberHistoryDto;
import com.pt.biscuIT.api.response.MemberDashboardRes;
import com.pt.biscuIT.api.service.MemberAuthService;
import com.pt.biscuIT.api.service.MemberService;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import com.pt.biscuIT.db.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {
    private final MemberService memberService;
    private final MemberAuthService memberAuthService;

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

    @GetMapping("/dashboard")
    public ResponseEntity<? extends BaseResponseBody> getDashBoardByMember(String identifier) {
        Member member = memberService.findMemberByIdentifier(identifier);
//        if(member == null) throw new BiscuitException(ErrorCode.USER_NOT_FOUND);

        List<MemberHistoryDto> histories = memberService.getHistoriesByMember(member);
        List<MemberGraphDto> graphs = memberService.getGraphsByMember(member);
        Integer point = memberService.getPointByMember(member);

        MemberDashboardRes res = MemberDashboardRes.builder()
                .histories(histories)
                .graphs(graphs)
                .point(point)
                .build();
        return ResponseEntity.ok(MemberDashboardRes.of(200, "Success", res));
    }
}
