package com.pt.biscuIT.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.api.response.SearchContentRes;
import com.pt.biscuIT.common.exception.BiscuitException;
import com.pt.biscuIT.common.exception.ErrorCode;
import com.pt.biscuIT.common.model.response.PageMetaData;
import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.entity.Type;
import com.pt.biscuIT.db.repository.ContentRepositorySupport;
import com.pt.biscuIT.db.repository.ContentTagRepositorySupport;
import com.pt.biscuIT.db.repository.ContentViewRepositorySupport;
import com.pt.biscuIT.db.repository.MemberBookmarkRepositorySupport;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

	private final ContentRepositorySupport contentRepositorySupport;
	private final ContentViewRepositorySupport contentViewRepositorySupport;
	private final ContentTagRepositorySupport contentTagRepositorySupport;
	private final MemberBookmarkRepositorySupport memberBookmarkRepositorySupport;

	@Override
	public SearchContentRes searchContent(Member member, String keyword, int from, int to, Long lastContentId, Pageable pageable, Type type, String option) {
		Page<Content> contentList = null;
		if("recent".equals(option)) {
			contentList = contentRepositorySupport.findRecentContentByTitleAndTag(keyword, pageable, lastContentId, from, to, type);
		}
		else if("hit".equals(option)) {
			Long popularId = contentViewRepositorySupport.findIdByContentId(lastContentId);
			contentList = contentRepositorySupport.findPopularContentByTitleAndTag(keyword, pageable, popularId, from, to, type);
		} else throw new BiscuitException(ErrorCode.INVALID_PARAMETER);

		if(contentList == null || contentList.getContent().size() == 0) throw new BiscuitException(ErrorCode.CONTENT_NOT_FOUND);

		PageMetaData metaData = PageMetaData.builder()
				.last(contentList.isLast())
				.lastContentId(
						contentList.getContent().get(contentList.getContent().size() - 1).getId()
				)
				.build();

		List<ContentInfoDto> contentInfoDtoList = new ArrayList<>();
		for(Content content : contentList.getContent()) {
			List<String> tags = contentTagRepositorySupport.findTagsByContentId(content.getId());
			ContentInfoDto contentInfoDto = new ContentInfoDto(content);
			contentInfoDto.setTags(tags);
			if(member != null) { //로그인된 상태라면
				boolean isMarked = memberBookmarkRepositorySupport.isMarked(member.getId(), content.getId());
				contentInfoDto.setMarked(isMarked);
			}
			contentInfoDtoList.add(contentInfoDto);
		}

		SearchContentRes res = SearchContentRes.builder()
				.metaData(metaData)
				.results(contentInfoDtoList)
				.build();

		return res;
	}
}
