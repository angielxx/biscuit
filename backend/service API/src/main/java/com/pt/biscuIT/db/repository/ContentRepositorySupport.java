package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.entity.QContent;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

/*
 * ContentRepositorySupport
 * @author 7unho
 * @since 2020-11-23
 */
@Repository
@RequiredArgsConstructor
public class ContentRepositorySupport {
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QContent qContent = QContent.content;

    public List<Content> getRandomRecentContent(String option, int offset, int limit) {
        return jpaQueryFactory
                .selectFrom(qContent)
                .offset(offset)
                .limit(limit)
                .orderBy(qContent.createdDate.desc())
                .fetch();
    }
}
