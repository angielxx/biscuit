package com.pt.biscuIT.api.dto.quiz;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class QuizSubmitDto {
	private Integer memberPoint;
}
