package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.db.entity.Content;
import com.pt.biscuIT.db.entity.QCategory;
import com.pt.biscuIT.db.entity.QContent;
import com.pt.biscuIT.db.entity.QContentTag;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.*;
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
import org.springframework.data.domain.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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
    QContentTag qContentTag = QContentTag.contentTag;

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
        List<OrderSpecifier> ORDERS = getOrderSpecifiers(pageable.getSort());
        return new PageImpl<>(
                jpaQueryFactory
                        .selectFrom(qContent)
                        .join(qContent.category, qCategory)
                        .where(
                                qCategory.mainName.like(category).or(qCategory.subName.like(category))
                        )
                        .orderBy(
                                ORDERS.stream().toArray(OrderSpecifier[]::new)
                        )
                        .offset(pageable.getOffset())
                        .limit(pageable.getPageSize())
                        .fetch(),
                pageable,
                jpaQueryFactory.selectFrom(qContent).fetch().size()
        );
    }

    public Page<Content> findContentByTitleAndTag(String keyword, String sort, Integer time,  Long lastContentId, Pageable pageable) {
        List<Content> contents = jpaQueryFactory
                .selectFrom(qContent)
                .join(qContentTag).on(qContentTag.content.id.eq(qContent.id))
                .where((containTitle(keyword).or(containTag(keyword))).and(existTime(time)))
                .offset(lastContentId)
                .limit(pageable.getPageSize() + 1)
                // .orderBy(qContent.hit.desc())
                .fetch()
                .stream()
                .distinct()
                .collect(Collectors.toList());
        return new PageImpl<>(contents, pageable, contents.size());
    }

    private BooleanExpression containTitle(String keyword) {
        if(keyword == null || keyword.isEmpty()) {
            return null;
        }
        return qContent.title.containsIgnoreCase(keyword);
    }

    private BooleanExpression containTag(String keyword) {
        if(keyword == null || keyword.isEmpty()) {
            return null;
        }
        return qContentTag.tag.name.containsIgnoreCase(keyword);
    }

    private BooleanExpression existTime(Integer time) {
        if(time == null) {
            return null;
        }
        return qContent.timeCost.eq(time);
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

    public Page<Content> findContentByTitle(Long lastContentId, String title, PageRequest pageRequest) {
        List<Content> contents = jpaQueryFactory
            .selectFrom(qContent)
            .where(containTitle(title),
                qContent.id.lt(lastContentId))
            .offset(pageRequest.getOffset())
            .limit(pageRequest.getPageSize() + 1)
            .orderBy(qContent.hit.desc())
            .fetch();
        return new PageImpl<>(contents, pageRequest, contents.size());
    }

    private BooleanExpression containTitle(String title) {
        if(title == null || title.isEmpty()) {
            return null;
        }
        return qContent.title.containsIgnoreCase(title);
    }
}