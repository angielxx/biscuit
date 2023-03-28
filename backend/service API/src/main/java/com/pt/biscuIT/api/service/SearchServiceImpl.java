package com.pt.biscuIT.api.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.api.response.SearchContentRes;
import com.pt.biscuIT.common.model.response.PageMetaData;
import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.entity.Type;
import com.pt.biscuIT.db.repository.ContentRepositorySupport;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

	private final ContentRepositorySupport contentRepositorySupport;

	@Override
	public SearchContentRes search(String keyword, Integer time,  Long lastContentId, Pageable pageable) {
		//태그 용 빈배열
		String[] tags = {};
		Pageable page = PageRequest.of(0, pageable.getPageSize(), pageable.getSort());
		Page<Content> contents = contentRepositorySupport.findContentByTitleAndTag(keyword, time, lastContentId, page);

		Page<ContentInfoDto> dtos = contents.map(c -> ContentInfoDto.builder()
			.id(c.getId())
			.title(c.getTitle())
			.url(c.getUrl())
			.creditBy(c.getChannel())
			.createdDate(c.getCreatedDate())
			.timeCost(c.getTimeCost())
			.type(Type.POST.toString())
			.isMarked(false)
			.tags(List.of(tags))
			.hit(c.getHit())
			.build());

		Long tmpLastContentId = 0L;
		if(contents.getContent().size() > 0) {
			tmpLastContentId = contents.getContent().get(contents.getContent().size() - 1).getId();
		}
		PageMetaData pageMetaData = PageMetaData.builder()
												.lastContentId(tmpLastContentId)
												.last(contents.isLast())
												.build();
		SearchContentRes res = SearchContentRes.builder()
			.metaData(pageMetaData)
			.results(dtos)
			.build();

		return res;
	}
}
