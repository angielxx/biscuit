package com.pt.biscuIT.api.service;

import org.springframework.stereotype.Service;

import com.pt.biscuIT.db.entity.Member;

@Service
public interface BookmarkService {
	void addBookmark(Member member, Long contentId);
}
