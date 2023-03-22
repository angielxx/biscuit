package com.pt.biscuIT.controller;

import com.pt.biscuIT.common.model.response.BaseResponseBody;
import com.pt.biscuIT.common.model.response.PageMetaData;
import com.pt.biscuIT.dto.content.ContentInfoDto;
import com.pt.biscuIT.dto.quiz.ProvideQuizDto;
import com.pt.biscuIT.dto.response.RandomRecentContentRes;
import com.pt.biscuIT.service.RecommandService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * RecommandController
 * @author 7unho
 * @since 2020-11-23
 */
@RestController
@RequestMapping("/api/v1/recommands")
@Slf4j
public class RecommandController {

    @Autowired
    RecommandService recommandService;

    /*
        TODO: 추천 컨텐츠를 제공하는 API
        ERROR CODE
        400: 잘못된 요청
        401: 인증되지 않은 사용자
        403: 권한 없음
        500: 서버 내부 오류
    */

    @GetMapping("/random/{option}")
    public ResponseEntity<? extends BaseResponseBody> getRandomRecentContent(@PathVariable String option, @RequestParam int offset, @RequestParam int limit) {
        List<ContentInfoDto> contentList = recommandService.getRandomRecentContent(option, offset, limit);
//        int page = recommandService.get
        PageMetaData metaData = PageMetaData.builder()
                                            .page(0)
                                            .build();
        RandomRecentContentRes res = RandomRecentContentRes.builder()
                                                            .metaData(metaData)
                                                            .results(contentList)
                                                            .build();

        return ResponseEntity.status(200).body(RandomRecentContentRes.of(200, "success", res));
    }
}
