package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.api.dto.content.FeedbackDto;
import com.pt.biscuIT.api.service.ContentService;
import com.pt.biscuIT.common.util.CsvUtil;
import com.pt.biscuIT.db.repository.ContentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/contents")
public class ContentController {
    ContentService contentService;
    ContentRepository contentRepositorySupport;

    @GetMapping("/{contentId}")
    public void getContentDetail(@PathVariable Long contentId) {
        contentService.getContentDetail(contentId);
    }
    @PostMapping("/{contentId}/feedback")
    public ResponseEntity<?> feedbackContent(
            @PathVariable Long contentId,
            @RequestBody FeedbackDto feedbackDto
    ) throws IOException {
//        contentService.feedbackContent(contentId, feedback);
        CsvUtil csvUtil = new CsvUtil();
        csvUtil.writeCsvFile(feedbackDto);
        return ResponseEntity.ok("SUCCESS");
    }

}
