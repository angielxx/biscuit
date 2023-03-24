package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.entity.QCategory;
import com.pt.biscuIT.db.entity.QContent;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPQLQuery;
import com.pt.biscuIT.db.entity.QContent;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.pt.biscuIT.db.entity.QContent;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.pt.biscuIT.db.entity.QContent;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

/*
 * ContentRepositorySupport
 * @author 7unho
 * @since 2020-11-23
 */
@Repository
@RequiredArgsConstructor
@Transactional
public class ContentRepositorySupport {
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QContent qContent = QContent.content;
    QCategory qCategory = QCategory.category;

    /**
     * 최근 등록된 컨텐츠를 랜덤으로 가져온다.
     *
     * @param pageable
     * @return
     */
    public Page<Content> findRecentContentByRandom(Pageable pageable) {
        return new PageImpl<>(
                jpaQueryFactory
                        .selectFrom(qContent)
                        .orderBy(qContent.createdDate.desc())
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize())
                        .fetch(),
                pageable,
                jpaQueryFactory.selectFrom(qContent).fetch().size()
        );
    }

    public Page<Content> findContentByCategory(String category, Pageable pageable) {
        return new PageImpl<>(
                jpaQueryFactory
                        .selectFrom(qContent)
                        .join(qContent.category, qCategory)
                        .where(
                                qCategory.mainName.like(category).or(qCategory.subName.like(category))
                        )
                        .orderBy(qContent.createdDate.desc())
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize())
                        .fetch(),
                pageable,
                jpaQueryFactory.selectFrom(qContent).fetch().size()
        );
    }

    public Page<Content> findContentByTitle(Long lastContentId, String keyword, PageRequest pageRequest) {
        List<Content> contents = jpaQueryFactory
                .selectFrom(qContent)
                .where(containTitle(keyword))
                .offset(lastContentId)
                .limit(pageRequest.getPageSize() + 1)
                .orderBy(qContent.hit.desc())
                .fetch();
        return new PageImpl<>(contents, pageRequest, contents.size());
    }

    private BooleanExpression containTitle(String keyword) {
        if(keyword == null || keyword.isEmpty()) {
            return null;
        }
        return qContent.title.containsIgnoreCase(keyword);
    }

    public Page<Content> findPopularContentByRandom(Pageable pageable) {
        List<Content> contentList = jpaQueryFactory
                                                    .selectFrom(qContent)
                                                    .orderBy(qContent.hit.desc())
                                                    .offset(pageable.getOffset())
                                                    .limit(pageable.getPageSize())
                                                    .fetch();
        Collections.shuffle(contentList);
        return new PageImpl<>(
                contentList,
                pageable,
                jpaQueryFactory
                        .selectFrom(qContent)
                        .orderBy(qContent.hit.desc())
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize())
                        .fetch()
                        .size()
        );
    }
}