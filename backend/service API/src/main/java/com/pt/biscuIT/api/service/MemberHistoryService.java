package com.pt.biscuIT.api.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pt.biscuIT.api.response.HistoryContentRes;
import com.pt.biscuIT.db.entity.Member;

@Service
public interface MemberHistoryService {
	void deleteHistory(Member member, Long historyId);

	HistoryContentRes getHistory(Member member, Long lastContentId, Pageable pageable);
}
