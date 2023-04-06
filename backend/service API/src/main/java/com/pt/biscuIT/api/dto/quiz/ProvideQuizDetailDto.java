package com.pt.biscuIT.api.dto.quiz;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class ProvideQuizDetailDto {
	private Long quizId;
	private String question;
	private String[] multiple_choice;
	private Integer answer;
}
