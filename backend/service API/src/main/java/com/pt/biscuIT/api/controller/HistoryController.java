package com.pt.biscuIT.api.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pt.biscuIT.api.service.MemberAuthService;
import com.pt.biscuIT.api.service.MemberHistoryService;
import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.entity.MemberHistory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/histories")
@Slf4j
@RequiredArgsConstructor
public class HistoryController {
	private final MemberAuthService memberAuthService;
	private final MemberHistoryService memberHistoryService;

	@PostMapping("/{historyId}")
	public void deleteHistory(@RequestHeader(value = "Authorization") String token, @PathVariable Long historyId) {
		Member member = memberAuthService.getMember(token);
		memberHistoryService.deleteHistory(member, historyId);
	}
}
