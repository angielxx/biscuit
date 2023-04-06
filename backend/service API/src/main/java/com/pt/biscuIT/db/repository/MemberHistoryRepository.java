package com.pt.biscuIT.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.entity.MemberHistory;

@Repository
public interface MemberHistoryRepository extends JpaRepository<MemberHistory, Long> {
	MemberHistory findByMemberAndContent(Member member, Content content);
}
