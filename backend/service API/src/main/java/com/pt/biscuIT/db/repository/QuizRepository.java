package com.pt.biscuIT.db.repository;

import java.util.List;

import com.pt.biscuIT.db.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.db.entity.Content;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
	List<Quiz> findQuizByContent(Content content);
}
