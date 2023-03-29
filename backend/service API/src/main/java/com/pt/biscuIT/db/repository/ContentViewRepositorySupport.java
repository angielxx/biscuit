package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.db.entity.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Transactional
public class ContentViewRepositorySupport {
    private final EntityManager em;
    private final JPAQueryFactory jpaQueryFactory;
    QContentView qContentView = QContentView.contentView;

    public Long findIdByContentId(Long lastContentId) {
        ContentView content = jpaQueryFactory
                .selectFrom(qContentView)
                .where(qContentView.contentId.eq(lastContentId))
                .fetchOne();


        return content == null ? Long.MAX_VALUE : content.getId();
    }
}
