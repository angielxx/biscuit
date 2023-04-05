package com.pt.biscuIT.api.response;

import com.pt.biscuIT.api.dto.bookmark.BookmarkContentInfoDto;
import com.pt.biscuIT.common.model.response.PageMetaData;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class BookmarkContentRes {
	PageMetaData metaData;
	List<BookmarkContentInfoDto> results;
}
