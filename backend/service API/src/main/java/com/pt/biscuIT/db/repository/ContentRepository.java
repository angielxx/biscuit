package com.pt.biscuIT.db.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.db.entity.Content;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
	Page<Content> findByTitleContainingIgnoreCaseOrderByHitDesc(Long lastContentId, PageRequest pageRequest);
}
