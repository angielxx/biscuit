package com.pt.biscuIT.api.response;

import java.util.List;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.api.dto.history.HistoryContentInfoDto;
import com.pt.biscuIT.common.model.response.PageMetaData;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HistoryContentRes {
	PageMetaData metaData;
	List<HistoryContentInfoDto> results;
}
