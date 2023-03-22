package com.pt.biscuIT.dto.response;

import com.pt.biscuIT.common.model.response.BaseResponseBody;
import com.pt.biscuIT.common.model.response.PageMetaData;
import com.pt.biscuIT.dto.content.ContentInfoDto;
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
