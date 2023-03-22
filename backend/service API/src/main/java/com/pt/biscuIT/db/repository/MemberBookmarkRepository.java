package com.pt.biscuIT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.entity.MemberBookmark;
import com.pt.biscuIT.entity.MemberInterest;

@Repository
public interface MemberBookmarkRepository extends JpaRepository<MemberBookmark, Long> {
}
