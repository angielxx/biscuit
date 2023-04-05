package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.api.dto.history.MemberGraphDto;
import com.pt.biscuIT.api.dto.history.MemberHistoryDto;
import com.pt.biscuIT.api.request.MemberOnboardingReq;
import com.pt.biscuIT.api.response.MemberDashboardRes;
import com.pt.biscuIT.api.response.MemberInfoRes;
import com.pt.biscuIT.api.response.MetaDataContentListRes;
import com.pt.biscuIT.api.service.CategoryService;
import com.pt.biscuIT.api.service.MemberAuthService;
import com.pt.biscuIT.api.service.MemberService;
import com.pt.biscuIT.common.exception.BiscuitException;
import com.pt.biscuIT.common.exception.ErrorCode;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import com.pt.biscuIT.db.entity.Job;
import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.entity.MemberInterest;
import com.pt.biscuIT.db.entity.MemberProfile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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
        Member member = memberAuthService.getMember(token);
        MemberProfile profile = memberService.getMemberProfileByMemberId(member.getId());
        MemberInfoRes res = MemberInfoRes.builder().nickname(member.getNickname())
                .job(profile.getJob().toString())
                .period(profile.getPeriod())
                .interests(memberService.getInterestList(member).stream().map(category -> category.getSubName().toString()).collect(Collectors.toList()))
                .build();;
        return ResponseEntity.ok(res);
    }

    @Transactional
    @PostMapping("/onboarding")
    public ResponseEntity<?> onboard(@RequestHeader(value = "Authorization") String token, @RequestBody MemberOnboardingReq memberOnboardingReq) {
        log.debug("token: " + token);
        Member member = memberAuthService.getMember(token);
        // nickname 정보 업데이트
        memberService.updateRole(member, "ROLE_MEMBER");
        memberService.updateNickName(member, memberOnboardingReq.getNickname());
        // job, period 정보 업데이트
        MemberProfile profile = MemberProfile.builder()
                .memberId(member.getId())
                .job(Job.valueOf(memberOnboardingReq.getJob().toUpperCase()))
                .period(memberOnboardingReq.getPeriod())
                .build();
        memberService.updateProfile(profile);
        // intrests 정보 업데이트 TODO : 중복 체크
        for (String interest : memberOnboardingReq.getInterests()) {
            memberService.saveMemberInterest(MemberInterest.builder()
                    .member(member)
                    .category(categoryService.getCategoryBySubName(interest))
                    .build());
        }
        return ResponseEntity.ok().build();
    }

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
