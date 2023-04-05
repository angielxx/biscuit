package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.quiz.ProvideQuizDto;
import com.pt.biscuIT.api.dto.quiz.QuizSubmitDto;
import com.pt.biscuIT.api.dto.quiz.QuizSubmitRequestDto;
import com.pt.biscuIT.db.entity.Member;
import org.springframework.stereotype.Service;

@Service
public interface QuizService {
	ProvideQuizDto provideQuiz(Long contentId);
    QuizSubmitDto submitQuiz(Member member, Long contentId, QuizSubmitRequestDto requestDto);
}
