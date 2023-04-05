package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.api.dto.history.MemberGraphDto;
import com.pt.biscuIT.api.dto.history.MemberHistoryDto;
import com.pt.biscuIT.api.dto.member.MemberInfoDto;
import com.pt.biscuIT.api.request.MemberInfoReq;
import com.pt.biscuIT.api.response.MemberDashboardRes;
import com.pt.biscuIT.api.response.MemberInfoRes;
import com.pt.biscuIT.api.service.CategoryService;
import com.pt.biscuIT.api.service.MemberAuthService;
import com.pt.biscuIT.api.service.MemberService;
import com.pt.biscuIT.common.exception.BiscuitException;
import com.pt.biscuIT.common.exception.ErrorCode;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.entity.MemberProfile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {
    private final MemberService memberService;
    private final MemberAuthService memberAuthService;
    private final CategoryService categoryService;

    /**
     * 회원 정보 조회
     * @param token
     * @return
     */
    @GetMapping("")
    public ResponseEntity<?> getMemberInfo(@RequestHeader(value = "Authorization") String token) {
        log.debug("GET: /api/members=============");
        Member member = memberAuthService.getMember(token);
        MemberProfile profile = memberService.getMemberProfileByMemberId(member.getId());
        MemberInfoRes res = MemberInfoRes.builder().nickname(member.getNickname())
                .job(profile.getJob().toString())
                .period(profile.getPeriod())
                .interests(memberService.getInterestList(member).stream().map(category -> category.getSubName().toString()).collect(Collectors.toList()))
                .build();
        return ResponseEntity.ok(res);
    }


    /**
     * 회원 정보 수정
     * @param token
     * @param memberInfoReq
     * @return
     */
    @PutMapping("")
    public ResponseEntity<?> updateMemberInfo(@RequestHeader(value = "Authorization") String token, @RequestBody MemberInfoReq memberInfoReq) {
        log.debug("PUT: /api/members=============");
        Member member = memberAuthService.getMember(token);
        memberService.updateMemberInfo(MemberInfoDto.builder()
                .memberId(member.getId())
                .nickname(memberInfoReq.getNickname())
                .job(memberInfoReq.getJob())
                .period(memberInfoReq.getPeriod())
                .interests(memberInfoReq.getInterests())
                .build());
        return ResponseEntity.ok().build();
    }

    /**
     * 온보딩
     * @param memberInfoReq
     * @return
     */
    @PostMapping("/onboarding")
    public ResponseEntity<?> onboard(@RequestHeader(value = "Authorization") String token, @RequestBody MemberInfoReq memberInfoReq) {
        log.debug("POST: /api/members/onboarding=============");
        Member member = memberAuthService.getMember(token);
        memberService.updateMemberInfo(MemberInfoDto.builder()
                .memberId(member.getId())
                .nickname(memberInfoReq.getNickname())
                .job(memberInfoReq.getJob())
                .period(memberInfoReq.getPeriod())
                .interests(memberInfoReq.getInterests())
                .build());
        return ResponseEntity.ok().build();
    }

    /**
     * 대시보드 조회
     * @param token
     * @return
     */
    @GetMapping("/dashboard")
    public ResponseEntity<? extends BaseResponseBody> getDashBoardByMember(
            @RequestHeader(required = false, value = "Authorization") String token
    ) {
        Member member = memberAuthService.getMember(token);
        if(member == null) throw new BiscuitException(ErrorCode.MEMBER_NOT_FOUND);

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
