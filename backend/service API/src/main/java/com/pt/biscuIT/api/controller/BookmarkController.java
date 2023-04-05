package com.pt.biscuIT.api.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pt.biscuIT.api.dto.bookmark.BookmarkAddDto;
import com.pt.biscuIT.api.service.BookmarkService;
import com.pt.biscuIT.api.service.MemberAuthService;
import com.pt.biscuIT.db.entity.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/bookmarks")
@Slf4j
@RequiredArgsConstructor
public class BookmarkController {

	private final MemberAuthService memberAuthService;
	private final BookmarkService bookmarkService;

	@PostMapping
	public void addBookmark(@RequestHeader(value = "Authorization") String token, @RequestBody BookmarkAddDto req){
		Member member = memberAuthService.getMember(token);
		bookmarkService.addBookmark(member, req.getContentId());
	}
}
