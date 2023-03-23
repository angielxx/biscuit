package com.pt.biscuIT.api.service;

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
	public SearchContentRes search(String keyword, Long lastContentId, Pageable pageable) {
		PageRequest pageRequest = PageRequest.of(0, pageable.getPageSize());
		Page<Content> contents = contentRepositorySupport.findContentByTitle(lastContentId, keyword, pageRequest);
		Page<ContentInfoDto> dtos = contents.map(c -> ContentInfoDto.builder()
			.id(c.getId())
			.title(c.getTitle())
			.url(c.getUrl())
			.creditBy(c.getCreditBy())
			.createdDate(c.getCreatedDate())
			.timeCost(c.getTimeCost())
			.type(Type.POST.toString())
			.isMarked(false)
			.tags(null)
			.hit(c.getHit())
			.build());

		PageMetaData pageMetaData = PageMetaData.builder()
			.page(contents.getNumber())
			.size(contents.getSize())
			.totalPageCnt(contents.getTotalPages())
			.itemCnt(contents.getTotalElements())
			.first(contents.isFirst())
			.last(contents.isLast())
			.build();
		SearchContentRes res = SearchContentRes.builder()
			.metaData(pageMetaData)
			.results(dtos)
			.build();

		return res;
	}
}
