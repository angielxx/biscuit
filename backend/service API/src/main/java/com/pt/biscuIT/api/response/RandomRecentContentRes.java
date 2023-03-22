package com.pt.biscuIT.api.response;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import com.pt.biscuIT.common.model.response.PageMetaData;
import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * @author 7unho
 * @since 2020-11-23
 * url = "/api/recommands/random/recent"
 * description = "최근 업로드 된 컨텐츠를 추천해준다."
 */

@Data
@Builder
public class RandomRecentContentRes extends BaseResponseBody {
    PageMetaData metaData;
    List<ContentInfoDto> results;

    public static RandomRecentContentRes of(Integer statusCode, String message, RandomRecentContentRes randomRecentContentRes) {
        randomRecentContentRes.setMessage(message);
        randomRecentContentRes.setStatusCode(statusCode);
        return null;
    }
}
