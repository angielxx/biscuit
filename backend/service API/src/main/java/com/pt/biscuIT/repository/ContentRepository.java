package com.pt.biscuIT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.entity.Content;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
}
