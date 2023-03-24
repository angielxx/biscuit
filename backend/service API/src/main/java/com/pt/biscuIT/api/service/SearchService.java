package com.pt.biscuIT.api.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pt.biscuIT.api.response.SearchContentRes;

@Service
public interface SearchService {

	SearchContentRes search(String keyword, String sort, Integer time,  Long lastContentId, Pageable pageable);
}
