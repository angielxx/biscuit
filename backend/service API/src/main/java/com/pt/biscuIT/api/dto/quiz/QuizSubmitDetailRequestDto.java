package com.pt.biscuIT.api.dto.quiz;

import lombok.Builder;
import lombok.Data;

@Data
public class QuizSubmitDetailRequestDto {
	private Long quizId;
	private Boolean answer;
}
