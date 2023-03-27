package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.api.response.RandomRecentContentRes;
import com.pt.biscuIT.api.service.ContentService;
import com.pt.biscuIT.api.service.RecommandService;
import com.pt.biscuIT.common.exception.BiscuitException;
import com.pt.biscuIT.common.exception.ErrorCode;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import com.pt.biscuIT.common.model.response.PageMetaData;
import com.pt.biscuIT.common.util.CsvUtil;
import com.pt.biscuIT.db.repository.ContentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/contents")
@Slf4j
public class ContentController {
    @Autowired
    ContentService contentService;

    @Autowired
    ContentRepository contentRepositorySupport;

    @GetMapping("/{contentId}")
    public void getContentDetail(@PathVariable Long contentId) {
        contentService.getContentDetail(contentId);
    }

    @PostMapping("/{contentId}/feedback")
    public ResponseEntity<?> feedbackContent(
            @PathVariable Long contentId,
            @RequestParam String feedback,
            @RequestParam(required = false) String timecost
    ) {
//        contentService.feedbackContent(contentId, feedback);
        CsvUtil csvUtil = new CsvUtil();
        csvUtil.writeCsvFile(new String[]{contentId.toString(), feedback, timecost});
        return ResponseEntity.ok("SUCCESS");
    }
}
