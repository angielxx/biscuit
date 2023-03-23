package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.quiz.ProvideQuizDto;
import org.springframework.stereotype.Service;

@Service
public interface QuizService {
	ProvideQuizDto provideQuiz(Long contentId);
}
