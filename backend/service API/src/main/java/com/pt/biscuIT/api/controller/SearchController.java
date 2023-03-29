package com.pt.biscuIT.api.controller;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.api.response.SearchContentRes;
import com.pt.biscuIT.api.service.SearchService;

import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchController {

	private final SearchService searchService;

	@GetMapping
	public SearchContentRes search(@RequestParam String keyword, @RequestParam(required = false) Integer time, @RequestParam Long lastContentId, @PageableDefault(size = 30, sort = "createdDate")Pageable pageable) {
		if(time == null) {
			time = 0;
		}
		return searchService.search(keyword, time, lastContentId, pageable);
	}
}
