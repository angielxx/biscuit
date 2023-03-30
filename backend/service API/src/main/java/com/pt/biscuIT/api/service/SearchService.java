package com.pt.biscuIT.api.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pt.biscuIT.api.response.SearchContentRes;

@Service
public interface SearchService {

	SearchContentRes search(String keyword, int from, int to, Long lastContentId, Pageable pageable, String condition);

}
