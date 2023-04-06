package com.pt.biscuIT.api.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.pt.biscuIT.api.dto.bookmark.BookmarkContentInfoDto;
import com.pt.biscuIT.api.dto.history.HistoryContentInfoDto;
import com.pt.biscuIT.api.response.BookmarkContentRes;
import com.pt.biscuIT.common.exception.BiscuitException;
import com.pt.biscuIT.common.exception.ErrorCode;
import com.pt.biscuIT.common.model.response.PageMetaData;
import com.pt.biscuIT.db.repository.ContentTageRepositorySupport;
import com.pt.biscuIT.db.repository.MemberBookmarkRepositorySupport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.entity.MemberBookmark;
import com.pt.biscuIT.db.repository.ContentRepository;
import com.pt.biscuIT.db.repository.MemberBookmarkRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

	private final MemberBookmarkRepository memberBookmarkRepository;
	private final ContentRepository contentRepository;
	private final MemberBookmarkRepositorySupport memberBookmarkRepositorySupport;
	private final ContentTageRepositorySupport contentTageRepositorySupport;

	@Override
	public void addBookmark(Member member, Long contentId) {
		Content content = contentRepository.findById(contentId)
			.orElseThrow(() -> new IllegalArgumentException("해당 컨텐츠가 없습니다."));
		//사용자가 해당 컨텐츠를 북마크했는지 확인
		if(!memberBookmarkRepositorySupport.isMarked(member.getId(), contentId)) {
			memberBookmarkRepository.save(MemberBookmark.builder()
					.createdDate(LocalDateTime.now())
					.content(content)
					.member(member)
					.build());
		}
	}

	@Override
	public void deleteBookmark(Member member, Long contentId) {
		Content content = contentRepository.findById(contentId)
			.orElseThrow(() -> new IllegalArgumentException("해당 컨텐츠가 없습니다."));
		//사용자가 해당 컨텐츠를 북마크했다면 찾아서 삭제
		MemberBookmark findBookmark = memberBookmarkRepository.findByMemberAndContent(member, content);
		if(findBookmark != null) {
			memberBookmarkRepository.deleteById(findBookmark.getId());
		}
	}

	@Override
	public BookmarkContentRes getBookmark(Member member, Long lastContentId, Pageable pageable) {
		Page<MemberBookmark> bookmarkContentList = memberBookmarkRepositorySupport.findBookmarkContentByMemberId(
			member.getId(), pageable, lastContentId);
		if(bookmarkContentList == null || bookmarkContentList.getContent().size() == 0) throw new BiscuitException(ErrorCode.CONTENT_NOT_FOUND);

		PageMetaData metaData = PageMetaData.builder()
				.last(bookmarkContentList.isLast())
				.lastContentId(bookmarkContentList.getContent().get(bookmarkContentList.getContent().size() - 1).getId())
				.build();

		List<BookmarkContentInfoDto> contentInfoDtoList = new ArrayList<>();
		for(MemberBookmark bookmark : bookmarkContentList.getContent()) {
			Content content = contentRepository.findById(bookmark.getContent().getId()).orElseThrow(() -> new BiscuitException(ErrorCode.CONTENT_NOT_FOUND));
			List<String> tags = contentTageRepositorySupport.findTagsByContentId(content.getId());
			BookmarkContentInfoDto contentInfoDto = new BookmarkContentInfoDto(content);
			contentInfoDto.setTags(tags);
			boolean isMarked = memberBookmarkRepositorySupport.isMarked(member.getId(), content.getId());
			contentInfoDto.setMarked(isMarked);
			contentInfoDto.setBookmarkId(bookmark.getId());
			contentInfoDtoList.add(contentInfoDto);
		}

		BookmarkContentRes res = BookmarkContentRes.builder()
				.metaData(metaData)
				.results(contentInfoDtoList)
				.build();
		return res;
	}
}
