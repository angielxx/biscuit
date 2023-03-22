package com.pt.biscuIT.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.db.entity.MemberInterest;

@Repository
public interface MemberInterestRepository extends JpaRepository<MemberInterest, Long> {
}
