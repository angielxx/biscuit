package com.pt.biscuIT.api.dto.quiz;

import java.util.List;

import lombok.Data;

@Data
public class ProvideQuizDto {
	private List<ProvideQuizDetailDto> quizzes;
}
