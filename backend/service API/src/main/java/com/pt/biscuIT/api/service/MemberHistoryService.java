package com.pt.biscuIT.api.service;

import org.springframework.stereotype.Service;

import com.pt.biscuIT.db.entity.Member;

@Service
public interface MemberHistoryService {
	void deleteHistory(Member member, Long historyId);
}
