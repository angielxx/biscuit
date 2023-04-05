package com.pt.biscuIT.api.service;

import java.time.LocalDateTime;

import com.pt.biscuIT.db.repository.MemberBookmarkRepositorySupport;
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

	@Override
	public void addBookmark(Member member, Long contentId) {
		Content content = contentRepository.findById(contentId)
			.orElseThrow(() -> new IllegalArgumentException("해당 컨텐츠가 없습니다."));
		memberBookmarkRepository.save(MemberBookmark.builder()
				.createdDate(LocalDateTime.now())
				.content(content)
				.member(member)
				.build());
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
}
