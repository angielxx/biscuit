package com.pt.biscuIT.api.service;

import org.springframework.stereotype.Service;

import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.entity.MemberHistory;
import com.pt.biscuIT.db.repository.MemberHistoryRepository;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberHistoryServiceImpl implements MemberHistoryService{
	private final MemberHistoryRepository memberHistoryRepository;
	
	@Override
	public void deleteHistory(Member member, Long historyId) {
		MemberHistory memberHistory = memberHistoryRepository.findById(historyId).orElseThrow(() -> new IllegalArgumentException("해당 히스토리가 없습니다."));
		if(memberHistory.getMember().getId() == member.getId()) {
			memberHistoryRepository.save(MemberHistory.builder()
					.id(memberHistory.getId())
					.createdDate(memberHistory.getCreatedDate())
					.content(memberHistory.getContent())
					.member(memberHistory.getMember())
					.isDeleted(true)
					.build());
		}
	}
}
