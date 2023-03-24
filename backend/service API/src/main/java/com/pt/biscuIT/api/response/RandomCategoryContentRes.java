package com.pt.biscuIT.api.response;

import com.pt.biscuIT.api.dto.content.ContentInfoListCategoryDto;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
@Builder
public class RandomCategoryContentRes extends BaseResponseBody {
    List<ContentInfoListCategoryDto> results;

    public static RandomCategoryContentRes of(Integer status, String message, RandomCategoryContentRes randomCategoryContentRes) {
        randomCategoryContentRes.setMessage(message);
        randomCategoryContentRes.setStatus(status);
        return randomCategoryContentRes;
    }

}
