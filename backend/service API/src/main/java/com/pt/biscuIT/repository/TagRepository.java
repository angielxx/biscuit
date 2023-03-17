package com.pt.biscuIT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.entity.Content;
import com.pt.biscuIT.entity.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
}
