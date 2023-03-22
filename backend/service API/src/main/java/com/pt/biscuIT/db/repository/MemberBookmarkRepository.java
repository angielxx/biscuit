package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.db.entity.MemberBookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberBookmarkRepository extends JpaRepository<MemberBookmark, Long> {
}
