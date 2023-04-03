package com.pt.biscuIT.api.service;

import com.pt.biscuIT.db.entity.Type;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pt.biscuIT.api.response.SearchContentRes;

@Service
public interface SearchService {

	SearchContentRes searchContent(String keyword, int from, int to, Long lastContentId, Pageable pageable, Type type, String option);

}
