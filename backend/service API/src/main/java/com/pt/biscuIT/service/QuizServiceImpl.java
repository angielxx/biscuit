package com.pt.biscuIT.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.pt.biscuIT.dto.quiz.ProvideQuizDto;
import com.pt.biscuIT.entity.Content;
import com.pt.biscuIT.entity.Quiz;
import com.pt.biscuIT.repository.ContentRepository;
import com.pt.biscuIT.repository.QuizRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService{
	private final QuizRepository quizRepository;
	private final ContentRepository contentRepository;

	@Override
	public ProvideQuizDto provideQuiz(Long contentId) {
		ProvideQuizDto responseDto = new ProvideQuizDto();
		Content content = null;
		Optional<Content> opContent = contentRepository.findById(contentId);
		if(opContent.isPresent()) {
			content = opContent.get();
		}

		List<Quiz> quizzes = quizRepository.findQuizByContent(content);


		return responseDto;
	}
}
