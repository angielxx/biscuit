package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.response.BookmarkContentRes;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pt.biscuIT.db.entity.Member;

@Service
public interface BookmarkService {
	void addBookmark(Member member, Long contentId);
    void deleteBookmark(Member member, Long contentId);

    BookmarkContentRes getBookmark(Member member, Long lastContentId, Pageable pageable);
}
