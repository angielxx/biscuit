package com.pt.biscuIT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.entity.MemberBookmark;
import com.pt.biscuIT.entity.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
}
