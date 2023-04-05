package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.db.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.db.entity.MemberInterest;

import java.util.List;

@Repository
public interface MemberInterestRepository extends JpaRepository<MemberInterest, Long> {
    List<MemberInterest> findAllByMemberId(Long id);

    MemberInterest findByMemberIdAndCategoryId(Long memberId, Long categoryId);
}
