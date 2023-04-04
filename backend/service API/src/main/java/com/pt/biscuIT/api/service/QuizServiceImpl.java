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

		//퀴즈 개수 중에 중복없는 난수 생성
		int cnt = 3;
		if(quizzesSize <= 3) {
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

		//생성한 난수에 해당하는 퀴즈 반환
		List<ProvideQuizDetailDto> quizzes = new ArrayList<>(); //반환용 quiz
		for(int i=0; i<cnt; i++) {
			Quiz quiz = findQuizzes.get(a[i]);
			//보기 배열 만들기
			String c = "";
			String[] choice = new String[3];
			int idx = 0;
			choice = quiz.getMultipleChoice().split("//");
			
			//답안 만들기
			int answer = -1;
			String ans = quiz.getAnswer();
			for(int j=0; j<choice.length; j++) {
				if(ans.contains(choice[j]) || ans.equals(choice[j])) {
					answer = j;
					break;
				}
			}

			//DTO 생성
			ProvideQuizDetailDto dto = ProvideQuizDetailDto.builder()
				.quizId(quiz.getId())
				.question(quiz.getQuestion())
				.multiple_choice(choice)
				.answer(answer)
				.build();
			quizzes.add(dto);
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
