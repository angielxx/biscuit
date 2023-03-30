package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.db.entity.*;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.*;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Arrays;
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
    QContentTag qContentTag = QContentTag.contentTag;

    QContentView qContentView = QContentView.contentView;

    /**
     * 최근 등록된 컨텐츠를 랜덤으로 가져온다.
     *
     * @param pageable
     * @return
     */
    public Page<Content> findRecentContentByCategory(String category, Pageable pageable, Long lastContentId, int from, int to) {
        BooleanBuilder whereCondition = new BooleanBuilder();

        whereCondition.and(qContent.id.lt(lastContentId));
        whereCondition.and(qCategory.mainName.like(category).or(qCategory.subName.like(category)));
        whereCondition.and(qContent.timeCost.between(from, to));

        List<Content> contentList = jpaQueryFactory
                .selectFrom(qContent)
                .join(qContent.category, qCategory)
                .where(whereCondition)
                .orderBy(qContent.id.desc())
                .offset(0)
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(
                contentList,
                pageable,
                jpaQueryFactory
                        .selectFrom(qContent)
                        .join(qContent.category, qCategory)
                        .where(whereCondition)
                        .orderBy(qContent.id.desc())
                        .fetch().size()
        );
    }

    public Page<Content> findPopularContentByCategory(String category, Pageable pageable, Long popularId, int from, int to) {
        BooleanBuilder whereCondition = new BooleanBuilder();

        // 조인 조건
        whereCondition.and(qContent.category.id.eq(qCategory.id));
        whereCondition.and(qContent.id.eq(qContentView.contentId));

        // 카테고리 서치
        whereCondition.and(qCategory.mainName.like(category).or(qCategory.subName.like(category)));

        // 페이징 조건
        whereCondition.and(qContentView.id.lt(popularId));

        // 시간 조건
        whereCondition.and(qContent.timeCost.between(from, to));

        List<Content> contentList = jpaQueryFactory
                .select(qContent)
                .from(qContent, qContentView, qCategory)
                .where(whereCondition)
                .orderBy(qContentView.id.desc())
                .offset(0)
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(
                contentList,
                pageable,
                jpaQueryFactory
                        .select(qContent)
                        .from(qContent, qContentView, qCategory)
                        .where(whereCondition)
                        .orderBy(qContentView.id.desc())
                        .fetch().size()
        );
    }

    public Page<Content> findRecentContentByTitleAndTag(String keyword, Pageable pageable, Long lastContentId, int from, int to) {
        BooleanBuilder whereCondition = new BooleanBuilder();
        whereCondition.and(qContent.id.lt(lastContentId));
        whereCondition.and(containTitle(keyword).or(cotainTag(keyword)));
        whereCondition.and(qContent.timeCost.between(from, to));

        List<Content> contents = jpaQueryFactory
            .selectFrom(qContent)
            .distinct()
            .join(qContentTag).on(qContentTag.content.id.eq(qContent.id))
            .where(whereCondition)
            .orderBy(qContent.id.desc())
            .offset(0)
            .limit(pageable.getPageSize())
            .fetch();
        return new PageImpl<>(contents, pageable,
            jpaQueryFactory
                .selectFrom(qContent)
                .distinct()
                .join(qContentTag).on(qContentTag.content.id.eq(qContent.id))
                .where(whereCondition)
                .orderBy(qContent.id.desc())
                .fetch().size());
    }

    public Page<Content> findPopularContentByTitleAndTag(String keyword, Pageable pageable, Long popularId, int from, int to) {
        BooleanBuilder whereCondition = new BooleanBuilder();
        whereCondition.and(qContentTag.content.id.eq(qContent.id));
        whereCondition.and(qContent.id.eq(qContentView.contentId));
        whereCondition.and(containTitle(keyword).or(cotainTag(keyword)));
        whereCondition.and(qContentView.id.lt(popularId));
        whereCondition.and(qContent.timeCost.between(from, to));
        List<Content> contents = jpaQueryFactory
                .select(qContent)
                .from(qContent, qContentView, qContentTag)
                .distinct()
                .where(whereCondition)
                .orderBy(qContentView.id.desc())
                .offset(0)
                .limit(pageable.getPageSize())
                .fetch();
        return new PageImpl<>(contents, pageable,
                    jpaQueryFactory
                        .select(qContent)
                        .from(qContent, qContentView, qContentTag)
                        .distinct()
                        .where(whereCondition)
                        .orderBy(qContentView.id.desc())
                        .fetch().size());
    }

    private BooleanExpression containTitle(String keyword) {
        if(keyword == null || keyword.isEmpty()) {
            return null;
        }
        return qContent.title.containsIgnoreCase(keyword);
    }

    private BooleanExpression cotainTag(String keyword) {
        if(keyword == null || keyword.isEmpty()) {
            return null;
        }
        return qContentTag.tag.name.containsIgnoreCase(keyword);
    }

    public Page<Content> findContentByRandom (Pageable pageable, int from, int to) {
        List<OrderSpecifier> ORDERS = getOrderSpecifiers(pageable.getSort());

        List<Content> contentList = jpaQueryFactory
                .selectFrom(qContent)
                .where(qContent.timeCost.between(from, to))
                .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

//        Collections.shuffle(contentList);

        return new PageImpl<>(
                contentList,
                pageable,
                jpaQueryFactory
                        .selectFrom(qContent)
                        .where(qContent.timeCost.between(from, to))
                        .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
                        .fetch()
                        .size()
        );
    }

    private List<OrderSpecifier> getOrderSpecifiers(Sort sort) {
        List<OrderSpecifier> orderSpecifiers = new ArrayList<>();

        sort.stream().forEach(order -> {
            String prop = order.getProperty();
            PathBuilder orderByExpression = new PathBuilder(Content.class, "content");
            orderSpecifiers.add(new OrderSpecifier<>(Order.DESC, orderByExpression.get(prop)));
        });
        return orderSpecifiers;
    }
}