package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.db.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.db.entity.ContentTag;

import java.util.List;

@Repository
public interface ContentTagRepository extends JpaRepository<ContentTag, Long> {
    List<ContentTag> findAllByContentId(Long contentId);

    List<ContentTag> findByTagId(String tag);
}
