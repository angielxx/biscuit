package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.api.dto.tag.RelativeTagDto;
import com.pt.biscuIT.db.entity.ContentTag;
import com.pt.biscuIT.db.entity.Tag;
import com.pt.biscuIT.db.repository.ContentTagRepository;
import com.pt.biscuIT.db.repository.ContentTagRepositorySupport;
import com.pt.biscuIT.db.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class ContentTagServiceImpl implements ContentTagService {
    private final ContentTagRepository contentTagRepository;
    private final ContentTagRepositorySupport contentTagRepositorySupport;
    private final TagRepository tagRepository;

    @Override
    public List<String> getTags(Long contentId) {
        return contentTagRepositorySupport.findTagsByContentId(contentId);
    }

    @Override
    public PriorityQueue<RelativeTagDto> getRelativeTags(List<String> tags) {
        String[] distinctTags = tags.stream().distinct().toArray(String[]::new);
        // 2-1. 주어진 히스토리에서 많이 겹치는 태그를 고른다.
        List<Long> duplicated = new ArrayList<>();
        for (int i = 0; i < distinctTags.length; i++) {
            duplicated.add((long) Collections.frequency(tags, distinctTags[i]) * 100 / tags.size());
        }
        // 2-2. 피인용수(관련된 컨텐츠가 많은) 순으로 태그를 고른다.
        List<Long> citation = new ArrayList<>();
        Arrays.stream(distinctTags).forEach(tag -> {
            citation.add((long) tagRepository.findByName(tag).get().getContentCnt());
        });
        long total = citation.stream().mapToLong(Long::longValue).sum();
        for (int i = 0; i < citation.size(); i++) {
            citation.set(i, citation.get(i) * 100 / total);
        }
        // 2-3. 2-1과 2-2를 합친다.
        PriorityQueue<RelativeTagDto> sortedTags = new PriorityQueue<>();
        for (int i = 0; i < distinctTags.length; i++) {
            sortedTags.offer(new RelativeTagDto(distinctTags[i], duplicated.get(i) * 8 / 10 + citation.get(i) * 6 / 10));
        }

        return sortedTags;
    }

    @Override
    public List<ContentTag> getContentByTag(String tag) {
        return contentTagRepositorySupport.findByTagId(tag);
    }
}