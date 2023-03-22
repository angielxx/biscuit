package com.pt.biscuIT.service;

import org.springframework.stereotype.Service;

import com.pt.biscuIT.dto.quiz.ProvideQuizDto;

@Service
public interface QuizService {
	ProvideQuizDto provideQuiz(Long contentId);
}
