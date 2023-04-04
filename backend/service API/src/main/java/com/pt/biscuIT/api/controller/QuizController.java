package com.pt.biscuIT.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pt.biscuIT.api.dto.quiz.ProvideQuizDto;
import com.pt.biscuIT.api.service.MemberAuthService;
import com.pt.biscuIT.api.service.MemberService;
import com.pt.biscuIT.api.service.QuizService;
import com.pt.biscuIT.db.entity.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api")
public class QuizController {
	private final QuizService quizService;
	private final MemberAuthService memberAuthService;

	@GetMapping("{contentId}/quizzes")
	public ProvideQuizDto provideQuiz(@RequestHeader(required = false, value = "Authorization") String token, @PathVariable Long contentId) {
		Member member = memberAuthService.getMember(token);

		return quizService.provideQuiz(contentId);
	}

}
