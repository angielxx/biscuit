package com.pt.biscuIT.api.dto.quiz;

import lombok.Data;

import java.util.List;

@Data
public class QuizSubmitRequestDto {
	private List<QuizSubmitDetailRequestDto> answers;
}
