package com.pt.biscuIT.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import com.pt.biscuIT.api.dto.quiz.ProvideQuizDetailDto;
import com.pt.biscuIT.api.dto.quiz.ProvideQuizDto;
import org.springframework.stereotype.Service;

import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.entity.Quiz;
import com.pt.biscuIT.db.repository.ContentRepository;
import com.pt.biscuIT.db.repository.QuizRepository;

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
		//컨텐츠 정보 가져오기
		Content content = null;
		Optional<Content> opContent = contentRepository.findById(contentId);
		if(opContent.isPresent()) {
			content = opContent.get();
		}

		//컨텐츠에 해당하는 퀴즈 가져오기
		List<Quiz> findQuizzes = quizRepository.findQuizByContent(content);
		int quizzesSize = findQuizzes.size();
		System.out.println("quizzesSize = " + quizzesSize);

		//퀴즈 개수 중에 중복없는 난수 생성
		int cnt = 3;
		if(quizzesSize > 3) {
			cnt = quizzesSize;
		}
		int a[] = new int[cnt]; //퀴즈 뽑을 난수
		int index = 0;
		Random rand = new Random();
		for(int i=0; i<cnt; i++) {
			do {
				index = (int)(Math.random() * quizzesSize);
			}while(exists(a, index));
			a[i] = index;
		}
		for(int i=0; i<cnt; i++) {
			System.out.println(a[i]);
		}

		//생성한 난수에 해당하는 퀴즈 반환
		List<ProvideQuizDetailDto> quizzes = new ArrayList<>(); //반환용 quiz
		for(int i=0; i<cnt; i++) {
			Quiz quiz = findQuizzes.get(a[i]);
			System.out.println("quiz.getQuestion() = " + quiz.getQuestion());
			//보기 배열 만들기
			String c = "";
			String[] choice = new String[3];
			int idx = 0;
			String[] multipleChoice = quiz.getMultipleChoice().split("//");
			System.out.println("문제의 보기");
			for(int j=0; j<multipleChoice.length; j++) {
				System.out.print(multipleChoice[j] + " ");
			}
			System.out.println();

			//답안 배열 만들기
			List<Integer> ans = new ArrayList<>();
			for(int j=0; j<quiz.getAnswer().length(); j++) {
				ans.add((quiz.getAnswer().charAt(j) - 'a') +1);
			}
			ProvideQuizDetailDto dto = ProvideQuizDetailDto.builder()
				.quizId(quiz.getId())
				.question(quiz.getQuestion())
				.multiple_choice(choice)
				.answer(ans.toArray(new Integer[ans.size()]))
				.build();
			quizzes.add(dto);
			System.out.println("dto.toString() = " + dto.toString());
		}
		responseDto.setQuizzes(quizzes);
		return responseDto;
	}

	private static boolean exists(int a[], int index) {
		for(int i=0; i<a.length; i++) {
			if(a[i]==index) {
				return true;
			}
		}
		return false;
	}
}
