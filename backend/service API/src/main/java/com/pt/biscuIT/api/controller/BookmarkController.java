package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.api.response.BookmarkContentRes;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

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

	@DeleteMapping("/{contentId}")
	public void deleteBookmark(@RequestHeader(value = "Authorization") String token, @PathVariable Long contentId){
		Member member = memberAuthService.getMember(token);
		bookmarkService.deleteBookmark(member, contentId);
	}

	@GetMapping
	public BookmarkContentRes getBookmark(@RequestHeader(value = "Authorization") String token,
										  @RequestParam(defaultValue = "999999") Long lastContentId,
										  @PageableDefault(size = 30, page = 0) Pageable pageable) {
		Member member = memberAuthService.getMember(token);
		return bookmarkService.getBookmark(member, lastContentId, pageable);
	}
}
