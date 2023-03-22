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
    // 현재 페이지: Page<Entity>.getPageNumber()
    int page;
    // 페이지당 사이즈: Page<Entity>.getPageSize()
    int size;
    // 전체 페이지 수: Page<Entity>.getTotalPages()
    int totalPageCnt;
    // 현재 dto 개수 : Page<Entity>.getTotalElements()
    long itemCnt;
    // 처음 페이지인지 확인 : Page<Entity>.isFirst()
    boolean first;
    // 마지막 페이지인지 확인 : Page<Entity>.isLast()
    boolean last;
}