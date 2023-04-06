package com.pt.biscuIT.api.response;

import com.pt.biscuIT.api.dto.category.CategoryInfoDto;
import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ContentInfoListRes extends BaseResponseBody {
    List<ContentInfoDto> results;

    public static ContentInfoListRes of(Integer status, String message, ContentInfoListRes contentInfoListRes) {
        contentInfoListRes.setMessage(message);
        contentInfoListRes.setStatus(status);
        contentInfoListRes.setResults(contentInfoListRes.getResults());
        return contentInfoListRes;
    }
}
