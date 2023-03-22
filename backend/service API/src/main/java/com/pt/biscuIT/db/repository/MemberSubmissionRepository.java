package com.pt.biscuIT.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.db.entity.MemberSubmission;

@Repository
public interface MemberSubmissionRepository extends JpaRepository<MemberSubmission, Long> {
}
