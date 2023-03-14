package com.pt.biscuIT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.entity.MemberInterest;
import com.pt.biscuIT.entity.MemberSubmission;

@Repository
public interface MemberInterestRepository extends JpaRepository<MemberInterest, Long> {
}
