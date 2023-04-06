package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.api.dto.content.ContentInfoListCategoryDto;
import com.pt.biscuIT.api.dto.history.HistoryContentInfoDto;
import com.pt.biscuIT.api.dto.tag.RelativeTagDto;
import com.pt.biscuIT.api.response.ContentInfoListRes;
import com.pt.biscuIT.api.response.RandomCategoryContentRes;
import com.pt.biscuIT.api.service.*;
import com.pt.biscuIT.common.exception.BiscuitException;
import com.pt.biscuIT.common.exception.ErrorCode;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import com.pt.biscuIT.common.model.response.PageMetaData;
import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.api.response.MetaDataContentListRes;
import com.pt.biscuIT.db.entity.ContentTag;
import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.entity.Type;
import com.pt.biscuIT.db.repository.ContentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/recommends")
public class RecommendController {
    private final RecommendService recommendService;
    private final ContentRepository contentRepositorySupport;
    private final MemberServiceImpl memberServiceImpl;
    private final MemberAuthService memberAuthService;
    private final ContentService contentService;
    private final MemberHistoryService memberHistoryService;
    private final ContentTagService contentTagService;

    /*
        TODO: 추천 컨텐츠를 제공하는 API
        ERROR CODE
        400: 잘못된 요청
        401: 인증되지 않은 사용자
        403: 권한 없음
        500: 서버 내부 오류
    */

    @GetMapping("/random")
    public ResponseEntity<? extends BaseResponseBody> getRandomRecentContent(
            @PageableDefault(size = 30) Pageable pageable,
            @RequestParam(required = false, defaultValue = "0") int from,
            @RequestParam(required = false, defaultValue = "1440") int to,
            @RequestParam Type type
    ) {
        Page<ContentInfoDto> contentList = recommendService.getRandomContent(pageable, from, to, type);

        PageMetaData metaData = PageMetaData.builder()
                .lastContentId(contentList.getContent().get(contentList.getContent().size() - 1).getId())
                .last(contentList.isLast())
                .build();

        return ResponseEntity.status(200).body(MetaDataContentListRes.of(
                HttpStatus.OK.value(),
                "SUCCESS",
                MetaDataContentListRes.builder()
                        .metaData(metaData)
                        .results(contentList.getContent())
                        .build())
        );
    }

    @GetMapping("/random/category")
    public ResponseEntity<? extends BaseResponseBody> getRandomCategoryContent(
            @PageableDefault(size = 30) Pageable pageable,
            @RequestParam(required = false, defaultValue = "5") int categoryCount,
            @RequestParam(required = false, defaultValue = "0") int from,
            @RequestParam(required = false, defaultValue = "1440") int to,
            @RequestParam Type type
    ) {
        Page<ContentInfoListCategoryDto> contentList = recommendService.getRandomCategoryContent(categoryCount, pageable, from, to, type);

        return ResponseEntity.status(200).body(RandomCategoryContentRes.of(
                HttpStatus.OK.value(),
                "SUCCESS",
                RandomCategoryContentRes.builder()
                        .results(contentList.getContent())
                        .build()
        ));
    }


    /**
     * 개인화된 추천 컨텐츠를 제공하는 API
     *
     * 1. 최근 n개의 히스토리에서 태그를 따온다.
     * 2-1. 주어진 히스토리에서 많이 겹치는 태그를 고른다.
     * 2-2. 피인용수(관련된 컨텐츠가 많은) 태그를 고른다.
     * 3. 2번에서 고른 태그를 가지고 있는 컨텐츠 중 일부를 가져온다. (현재 조회수 기준)
     * 4. 컨텐츠의 수가 50 + n개가 될 때까지 2번과 3번 과정을 반복한다.
     * 5. 4번에서 만들어진 컨텐츠에서 최근 n개의 히스토리를 제외한 컨텐츠 중 50개를 랜덤으로 고른다.
     * @param token
     * @return
     */
    @GetMapping("/personal/fit")
    public ResponseEntity<?> getFitContent(@RequestHeader(value = "Authorization") String token){
        Member member = memberAuthService.getMember(token);
        // 1. 최근 n개의 히스토리에서 태그를 따온다.
        PageRequest pageRequest = PageRequest.of(0, 10);
        List<HistoryContentInfoDto> historyContentInfoDtoList = memberHistoryService.getHistory(member, 999999L, pageRequest).getResults();
        List<String> tags = new ArrayList<>();
        for (HistoryContentInfoDto historyContentInfoDto : historyContentInfoDtoList) {
            tags.addAll(contentTagService.getTags(historyContentInfoDto.getContentId()));
        }
        // 2-1. 주어진 히스토리에서 겹치는 빈도 + 피인용수(관련된 컨텐츠가 많은)를 고려하여 태그를 고른다. 8:6의 비율
        PriorityQueue<RelativeTagDto> pq = contentTagService.getRelativeTags(tags);
        // 3. 2번에서 고른 태그를 가지고 있는 컨텐츠 중 일부를 가져온다. (현재 조회수 기준)
        List<ContentInfoDto> contentInfoDtoList = new ArrayList<>();
        while (pq != null && !pq.isEmpty() && contentInfoDtoList.size() < 50) {
            contentInfoDtoList.addAll(contentTagService.getContentByTag(pq.poll().getTag()).stream().map(contentTag -> new ContentInfoDto(contentTag.getContent())).collect(Collectors.toList()));
        }

        return ResponseEntity.status(200).body(MetaDataContentListRes.of(
                HttpStatus.OK.value(),
                "SUCCESS",
                MetaDataContentListRes.builder()
                        .results(contentInfoDtoList)
                        .build()
        ));
    }

    @GetMapping("/personal/favorite")
    public ResponseEntity<? extends BaseResponseBody> getFavoriteCategoryContent(
            @PageableDefault(size = 30) Pageable pageable,
            @RequestParam(required = false, defaultValue = "0") int from,
            @RequestParam(required = false, defaultValue = "1440") int to,
            @RequestParam Type type,
            @RequestHeader(value = "Authorization") String token
    ) {
        Member member = memberAuthService.getMember(token);
        if(member == null) throw new BiscuitException(ErrorCode.MEMBER_NOT_FOUND);

        Page<ContentInfoListCategoryDto> contentList = recommendService.getFavoriteCategoryContent(pageable, from, to, type, member.getId());

        return ResponseEntity.status(200).body(RandomCategoryContentRes.of(
                HttpStatus.OK.value(),
                "SUCCESS",
                RandomCategoryContentRes.builder()
                        .results(contentList.getContent())
                        .build()
        ));
    }

    @GetMapping("/personal/{option}")
    public ResponseEntity<? extends BaseResponseBody> getContentByPersonalOption(
            @PageableDefault(size = 30) Pageable pageable,
            @RequestParam(required = false, defaultValue = "0") int from,
            @RequestParam(required = false, defaultValue = "1440") int to,
            @RequestParam Type type,
            @PathVariable String option,
            @RequestHeader(value = "Authorization") String token
    ) {
        Member member = memberAuthService.getMember(token);
        if(member == null) throw new BiscuitException(ErrorCode.MEMBER_NOT_FOUND);
        Page<ContentInfoDto> contentList = new PageImpl<>(new ArrayList<>(), pageable, 0);

        if("bookmarked".equals(option) || "similar".equals(option)) contentList = recommendService.getPersonalContent(option, pageable, from, to, type, member);
        else throw new BiscuitException(ErrorCode.INVALID_PARAMETER);

        contentService.setProperty(contentList.getContent(), member.getId());

        return ResponseEntity.status(200).body(ContentInfoListRes.of(
                HttpStatus.OK.value(),
                "SUCCESS",
                ContentInfoListRes.builder()
                        .results(contentList.getContent())
                        .build()
        ));
    }
}
