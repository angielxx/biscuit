package com.pt.biscuIT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.entity.Category;
import com.pt.biscuIT.entity.ContentTag;

@Repository
public interface ContentTagRepository extends JpaRepository<ContentTag, Long> {
}
