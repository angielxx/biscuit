package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.api.dto.tag.RelativeTagDto;
import com.pt.biscuIT.db.entity.ContentTag;
import com.pt.biscuIT.db.entity.Tag;

import java.util.List;
import java.util.PriorityQueue;

public interface ContentTagService {
    public List<String> getTags(Long contentId);

    /**
     * 2-1. 주어진 히스토리에서 많이 겹치는 태그를 고른다. & 2-2. 피인용수(관련된 컨텐츠가 많은) 태그를 고른다.
     * @param tags
     */
    PriorityQueue<RelativeTagDto> getRelativeTags(List<String> tags);

    List<ContentTag> getContentByTag(String tags);
}
