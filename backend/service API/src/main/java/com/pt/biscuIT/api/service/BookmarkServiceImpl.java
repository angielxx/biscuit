package com.pt.biscuIT.api.service;

import java.time.LocalDateTime;

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
}
