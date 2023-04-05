package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.api.service.ContentService;
import com.pt.biscuIT.api.service.MemberAuthService;
import com.pt.biscuIT.common.util.CsvUtil;
import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.repository.ContentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contents")
@Slf4j
@RequiredArgsConstructor
public class ContentController {
    private final ContentService contentService;
    private final ContentRepository contentRepositorySupport;
    private final MemberAuthService memberAuthService;

    @GetMapping("/{contentId}")
    public void getContentDetail(@RequestHeader(required = false, value = "Authorization") String token, @PathVariable Long contentId) {
        Member member = memberAuthService.getMember(token);
        contentService.getContentDetail(member, contentId);
    }
    @PostMapping("/{contentId}/feedback")
    public ResponseEntity<?> feedbackContent(
            @PathVariable Long contentId,
            @RequestBody String feedback,
            @RequestBody(required = false) String timecost
    ) {
//        contentService.feedbackContent(contentId, feedback);
        CsvUtil csvUtil = new CsvUtil();
        csvUtil.writeCsvFile(new String[]{contentId.toString(), feedback, timecost});
        return ResponseEntity.ok("SUCCESS");
    }

}
