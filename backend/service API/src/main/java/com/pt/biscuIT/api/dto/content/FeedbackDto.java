package com.pt.biscuIT.api.dto.content;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FeedbackDto {
    private Long contentId;
    private int feedback;
    private int timecost;

    @Builder
    public FeedbackDto(Long contentId, int feedback, int timecost) {
        this.contentId = contentId;
        this.feedback = feedback;
        this.timecost = timecost;
    }

    public String toString() {
        return contentId + ", " + feedback + ", " + timecost;
    }
}
