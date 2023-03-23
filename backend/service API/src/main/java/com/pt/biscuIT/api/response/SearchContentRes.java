package com.pt.biscuIT.api.response;

import java.util.List;

import org.springframework.data.domain.Page;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.common.model.response.PageMetaData;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchContentRes {
	PageMetaData metaData;
	Page<ContentInfoDto> results;
}
