package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.api.dto.category.CategoryInfoDto;
import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.api.response.CategoryInfoListRes;
import com.pt.biscuIT.api.response.MetaDataContentListRes;
import com.pt.biscuIT.api.response.SearchContentRes;
import com.pt.biscuIT.api.service.CategoryService;
import com.pt.biscuIT.api.service.ContentService;
import com.pt.biscuIT.api.service.MemberAuthService;
import com.pt.biscuIT.common.exception.BiscuitException;
import com.pt.biscuIT.common.exception.ErrorCode;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import com.pt.biscuIT.common.model.response.PageMetaData;
import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.entity.Type;
import com.pt.biscuIT.db.repository.CategoryRepository;
import com.pt.biscuIT.db.repository.ContentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@Slf4j
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    private final ContentService contentService;
    private final MemberAuthService memberAuthService;

    @GetMapping
    public ResponseEntity<? extends BaseResponseBody> getCategories() {
        List<CategoryInfoDto> categoryItemList = categoryService.getCategoryItemList();

        CategoryInfoListRes res = CategoryInfoListRes.builder()
                                                     .categories(categoryItemList)
                                                     .build();
        return ResponseEntity.status(200).body(CategoryInfoListRes.of(HttpStatus.OK.value(), "SUCCESS", res));
    }

    @GetMapping("/{category}/contents/{condition}")
    public ResponseEntity<? extends BaseResponseBody> getContentByCategory(
            @PathVariable String category,
            @PageableDefault(size = 30, page = 0) Pageable pageable,
            @RequestParam(defaultValue = "999999") Long lastContentId,
            @RequestParam(required = false, defaultValue = "0") int from,
            @RequestParam(required = false, defaultValue = "1440") int to,
            @PathVariable String condition,
            @RequestParam Type type,
            @RequestHeader(required = false, value = "Authorization") String token
    ) {
        Member member = Member.builder().build();
        if(token != null) {
            member = memberAuthService.getMember(token);
        }
        Page<ContentInfoDto> contentList = contentService.getCategoryContent(category, pageable, lastContentId, from, to, condition, type);
        if(contentList.getContent().size() == 0) throw new BiscuitException(ErrorCode.CONTENT_NOT_FOUND);

        contentService.setProperty(contentList.getContent(), member.getId());
        PageMetaData metaData = PageMetaData.builder()
                .last(contentList.isLast())
                .lastContentId(
                        contentList.getContent().get(contentList.getContent().size() - 1).getId()
                )
                .build();

        MetaDataContentListRes res = MetaDataContentListRes.builder()
                .metaData(metaData)
                .results(contentList.getContent())
                .build();

        return ResponseEntity.status(200).body(MetaDataContentListRes.of(HttpStatus.OK.value(), "SUCCESS", res));
    }
}
