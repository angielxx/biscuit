package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.db.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.db.entity.Content;

import java.util.List;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
	Page<Content> findByTitleContainingIgnoreCaseOrderByHitDesc(Long lastContentId, PageRequest pageRequest);

	@Query(
			value = "SELECT DISTINCT main_name " +
					"FROM category " +
					"UNION " +
					"SELECT DISTINCT sub_name " +
					"FROM category " +
					"ORDER BY rand() " +
					"LIMIT :categoryCount",
			nativeQuery = true
	)
	List<String> findRandomCategoryByCount(@Param("categoryCount") int categoryCount);
}
