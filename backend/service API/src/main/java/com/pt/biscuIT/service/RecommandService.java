package com.pt.biscuIT.service;

import com.pt.biscuIT.dto.content.ContentInfoDto;
import com.pt.biscuIT.dto.response.RandomRecentContentRes;
import com.pt.biscuIT.entity.Content;
import com.pt.biscuIT.repository.ContentRepositorySupport;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/*
 * RecommandService
 * @author 7unho
 * @since 2020-11-23
 */
@Slf4j
@Service("recommandService")
public class RecommandService {
    @Autowired
    ContentRepositorySupport contentRepositorySupport;

    public List<ContentInfoDto> getRandomRecentContent(String option, int offset, int limit) {
        List<Content> contentList = new ArrayList<>();
        List<ContentInfoDto> res = new ArrayList<>();
        if("recent".equals(option)){
            contentList = contentRepositorySupport.getRandomRecentContent(option, offset, limit);
        } else if("random".equals(option)) {
            return null;
        } else if("category".equals(option)) {
            return null;
        }

        contentList.forEach(content -> {
            ContentInfoDto contentInfoDto = ContentInfoDto.builder()
                                                          .id(content.getId())
                                                          .title(content.getTitle())
                                                          .url(content.getUrl())
                                                          .creditBy(content.getCreditBy())
                                                          .createdAt(content.getCreatedDate().toString())
                                                          .timeCost(content.getTimeCost().toString())
                                                          .type(content.getType().toString())
                                                          .isMarked(false)
                                                          .build();
            res.add(contentInfoDto);
        });

        return res;
    }
}
