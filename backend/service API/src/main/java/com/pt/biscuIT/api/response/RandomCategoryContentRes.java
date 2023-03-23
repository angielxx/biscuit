package com.pt.biscuIT.api.response;

import com.pt.biscuIT.api.dto.content.ContentInfoListCategoryDto;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RandomCategoryContentRes extends BaseResponseBody {
    List<ContentInfoListCategoryDto> results;

    public static RandomCategoryContentRes of(Integer statusCode, String message, RandomCategoryContentRes randomCategoryContentRes) {
        randomCategoryContentRes.setMessage(message);
        randomCategoryContentRes.setStatusCode(statusCode);
        return randomCategoryContentRes;
    }

}
