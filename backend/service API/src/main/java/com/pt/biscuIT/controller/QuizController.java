package com.pt.biscuIT.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pt.biscuIT.dto.quiz.ProvideQuizDto;
import com.pt.biscuIT.service.QuizService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api")
public class QuizController {
	private final QuizService quizService;

	@GetMapping("{contentId}/quizzes")
	public ProvideQuizDto provideQuiz(@PathVariable Long contentId) {
		return quizService.provideQuiz(contentId);
	}
}
