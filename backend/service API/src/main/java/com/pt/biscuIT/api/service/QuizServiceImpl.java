package com.pt.biscuIT.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import com.pt.biscuIT.api.dto.quiz.*;
import com.pt.biscuIT.db.entity.*;
import com.pt.biscuIT.db.repository.*;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService{
	private final QuizRepository quizRepository;
	private final ContentRepository contentRepository;
	private final MemberPointRepositorySupport memberPointRepositorySupport;
	private final MemberSubmissionRepository memberSubmissionRepository;
	private final MemberPointRepository memberPointRepository;

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
			String[] tmpChoice = new String[3];
			int idx = 0;
			choice = quiz.getMultipleChoice().split("//");
			for(int j=0; j<choice.length; j++) {
				tmpChoice[j] = choice[j].replaceAll(" ", "");
			}
			
			//답안 만들기
			int answer = -1;
			String ans = quiz.getAnswer();
			String tmpAns = ans.replaceAll(" ", "");
			for(int j=0; j<choice.length; j++) {
				if(tmpAns.equals(tmpChoice[j])) {
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

	@Override
	public QuizSubmitDto submitQuiz(Member member, Long contentId, QuizSubmitRequestDto requestDto) {
		//사용자의 원래 point
		Integer pointByMemberId = memberPointRepositorySupport.findPointByMemberId(member.getId());

		List<QuizSubmitDetailRequestDto> answers = requestDto.getAnswers();

		//사용자의 풀이내역 저장 + 갱신될 point 정보 확인
		int upPoint = 0;
		for(int i=0; i<answers.size(); i++) {
			if(answers.get(i).getAnswer()) {
				upPoint++;
			}
			Quiz quiz = quizRepository.findById(answers.get(i).getQuizId()).get();

			memberSubmissionRepository.save(MemberSubmission.builder()
							.member(member)
							.quiz(quiz)
							.isCorrect(answers.get(i).getAnswer())
							.build());
		}

		//사용자의 갱신된 point정보 저장
		if(upPoint > 0) {
			memberPointRepository.save(MemberPoint.builder()
					.changedPoints(upPoint)
					.pointTrigger(PointTrigger.QUIZ)
					.totalPoints(pointByMemberId+upPoint)
					.member(member)
					.build());
		}
		return QuizSubmitDto.builder().memberPoint(pointByMemberId).build();
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
