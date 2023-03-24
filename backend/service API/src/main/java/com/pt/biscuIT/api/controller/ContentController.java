package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.api.response.RandomRecentContentRes;
import com.pt.biscuIT.api.service.ContentService;
import com.pt.biscuIT.api.service.RecommandService;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import com.pt.biscuIT.common.model.response.PageMetaData;
import com.pt.biscuIT.db.repository.ContentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contents")
@Slf4j
public class ContentController {
    @Autowired
    ContentService contentService;

    @Autowired
    ContentRepository contentRepositorySupport;

    @GetMapping("/{category}")
    public ResponseEntity<? extends BaseResponseBody> getRandomRecentContent(@PathVariable String category, Pageable pageable) {
        Page<ContentInfoDto> contentList = contentService.getCategoryContent(category, pageable);

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

        return ResponseEntity.status(200).body(RandomRecentContentRes.of(HttpStatus.OK.value(), "SUCCESS", res));
    }
}
