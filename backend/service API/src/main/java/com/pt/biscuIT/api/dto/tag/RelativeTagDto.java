package com.pt.biscuIT.api.dto.tag;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class RelativeTagDto implements Comparable<RelativeTagDto> {
    private String tag;
    private long score;

    public RelativeTagDto(String tag, int score) {
        this.tag = tag;
        this.score = score;
    }

    @Override
    public int compareTo(RelativeTagDto o) {
        return Long.compare(this.getScore(), o.getScore());
    }
}
