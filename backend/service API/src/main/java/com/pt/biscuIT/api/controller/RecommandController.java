package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.common.model.response.BaseResponseBody;
import com.pt.biscuIT.common.model.response.PageMetaData;
import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.api.response.RandomRecentContentRes;
import com.pt.biscuIT.api.service.RecommandService;
import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.repository.ContentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommands")
@Slf4j
public class RecommandController {

    @Autowired
    RecommandService recommandService;

    @Autowired
    ContentRepository contentRepositorySupport;

    /*
        TODO: 추천 컨텐츠를 제공하는 API
        ERROR CODE
        400: 잘못된 요청
        401: 인증되지 않은 사용자
        403: 권한 없음
        500: 서버 내부 오류
    */

    @GetMapping("/random/{option}")
    public ResponseEntity<? extends BaseResponseBody> getRandomRecentContent(@PathVariable String option, Pageable pageable) {
        Page<ContentInfoDto> contentList = recommandService.getRandomContent(option, pageable);

        PageMetaData metaData = PageMetaData.builder()
                                            .first(contentList.isFirst())
                                            .last(contentList.isLast())
                                            .size(contentList.getSize())
                                            .page(contentList.getNumber())
                                            .itemCnt(contentList.getNumberOfElements())
                                            .totalPageCnt(contentList.getTotalPages())
                                            .build();

        RandomRecentContentRes res = RandomRecentContentRes.builder()
                                                            .metaData(metaData)
                                                            .results(contentList.getContent())
                                                            .build();

        return ResponseEntity.status(200).body(RandomRecentContentRes.of(200, "SUCCESS", res));
    }
}
