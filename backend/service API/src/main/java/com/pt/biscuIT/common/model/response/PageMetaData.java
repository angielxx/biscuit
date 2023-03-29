package com.pt.biscuIT.common.model.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/*
 * PageMetaData
 * @author 7unho
 * @since 2020-11-23
 *
 */
@Getter
@Setter
@Builder
public class PageMetaData {
    // 마지막 컨텐츠 id
    Long lastContentId;
    // 마지막 페이지인지 확인 : pageable.isLast()
    boolean last;
}