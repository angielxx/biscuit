package com.pt.biscuIT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
}
