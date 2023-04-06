package com.pt.biscuIT.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pt.biscuIT.api.dto.history.HistoryContentInfoDto;
import com.pt.biscuIT.api.response.HistoryContentRes;
import com.pt.biscuIT.common.exception.BiscuitException;
import com.pt.biscuIT.common.exception.ErrorCode;
import com.pt.biscuIT.common.model.response.PageMetaData;
import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.entity.MemberHistory;
import com.pt.biscuIT.db.repository.ContentRepository;
import com.pt.biscuIT.db.repository.ContentTagRepositorySupport;
import com.pt.biscuIT.db.repository.MemberBookmarkRepositorySupport;
import com.pt.biscuIT.db.repository.MemberHistoryRepository;
import com.pt.biscuIT.db.repository.MemberHistoryRepositorySupport;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberHistoryServiceImpl implements MemberHistoryService{
	private final MemberHistoryRepository memberHistoryRepository;
	private final MemberHistoryRepositorySupport memberHistoryRepositorySupport;
	private final ContentTagRepositorySupport contentTagRepositorySupport;
	private final MemberBookmarkRepositorySupport memberBookmarkRepositorySupport;
	private final ContentRepository contentRepository;

	@Override
	public void deleteHistory(Member member, Long historyId) {
		MemberHistory memberHistory = memberHistoryRepository.findById(historyId).orElseThrow(() -> new IllegalArgumentException("해당 히스토리가 없습니다."));
		if(memberHistory.getMember().getId() == member.getId()) {
			memberHistoryRepository.save(MemberHistory.builder()
					.id(memberHistory.getId())
					.createdDate(memberHistory.getCreatedDate())
					.content(memberHistory.getContent())
					.member(memberHistory.getMember())
					.isDeleted(true)
					.build());
		}
	}


	/**
	 * 히스토리 조회
	 * @param member
	 * @param lastContentId
	 * @param pageable
	 * @return
	 */
	@Override
	public HistoryContentRes getHistory(Member member, Long lastContentId, Pageable pageable) {
		Page<MemberHistory> historyContentList = memberHistoryRepositorySupport.findHistoryContentByMemberId(
			member.getId(), pageable, lastContentId);
		if(historyContentList == null || historyContentList.getContent().size() == 0) throw new BiscuitException(ErrorCode.CONTENT_NOT_FOUND);
		PageMetaData metaData = PageMetaData.builder()
			.last(historyContentList.isLast())
			.lastContentId(
				historyContentList.getContent().get(historyContentList.getContent().size() - 1).getId()
			)
			.build();

		List<HistoryContentInfoDto> contentInfoDtoList = new ArrayList<>();
		for(MemberHistory history : historyContentList.getContent()) {
			Content content = contentRepository.findById(history.getContent().getId()).orElseThrow(() -> new BiscuitException(ErrorCode.CONTENT_NOT_FOUND));
			List<String> tags = contentTagRepositorySupport.findTagsByContentId(content.getId());
			HistoryContentInfoDto contentInfoDto = new HistoryContentInfoDto(content);
			contentInfoDto.setTags(tags);
			boolean isMarked = memberBookmarkRepositorySupport.isMarked(member.getId(), content.getId());
			contentInfoDto.setMarked(isMarked);
			contentInfoDto.setMemberHistoryId(history.getId());
			contentInfoDtoList.add(contentInfoDto);
		}

		HistoryContentRes res = HistoryContentRes.builder()
			.metaData(metaData)
			.results(contentInfoDtoList)
			.build();
		return res;
	}
}
