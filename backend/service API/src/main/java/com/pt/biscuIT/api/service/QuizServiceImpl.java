package com.pt.biscuIT.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.pt.biscuIT.dto.quiz.ProvideQuizDetailDto;
import com.pt.biscuIT.dto.quiz.ProvideQuizDto;
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
		//컨텐츠 가져오기
		Content content = null;
		Optional<Content> opContent = contentRepository.findById(contentId);
		if(opContent.isPresent()) {
			content = opContent.get();
		}
		//중복없는 난수 생성
		int cnt = 3;
		int a[] = new int[cnt]; //퀴즈 뽑을 난수
		Random rand = new Random();
		for(int i=0; i<cnt; i++) {
			a[i] = rand.nextInt(4);
			for(int j=0; j<i; j++) {
				if(a[i] == a[j]){
					i--;
				}
			}
		}
		//생성한 난수에 해당하는 퀴즈 반환
		List<ProvideQuizDetailDto> quizzes = new ArrayList<>();
		List<Quiz> findQuizzes = quizRepository.findQuizByContent(content);
		for(int i=0; i<cnt; i++) {
			Quiz quiz = findQuizzes.get(a[i]);
			//보기 배열 만들기
			String c = "";
			String[] choice = new String[3];
			int idx = 0;
			for(int j=0; j<quiz.getMultipleChoice().length(); j++) {
				if(quiz.getMultipleChoice().charAt(j)==' ') {
					c = c.substring(0, c.length()-2);
					choice[idx] = c;
					idx++;
					c = "";
				}
				else {
					c += quiz.getMultipleChoice().charAt(j);
				}
			}
			choice[idx] = c.substring(0, c.length()-2);

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
		}
		responseDto.setQuizzes(quizzes);
		return responseDto;
	}
}
