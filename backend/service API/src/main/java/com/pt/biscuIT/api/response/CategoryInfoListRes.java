package com.pt.biscuIT.api.response;


import com.pt.biscuIT.api.dto.category.CategoryInfoDto;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.List;

@Data
@Builder
public class CategoryInfoListRes extends BaseResponseBody {
    List<CategoryInfoDto> categories;

    public static CategoryInfoListRes of(Integer status, String message, CategoryInfoListRes categoryInfoListRes) {
        categoryInfoListRes.setMessage(message);
        categoryInfoListRes.setStatus(status);
        return categoryInfoListRes;
    }
}
