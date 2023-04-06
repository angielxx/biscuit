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
import java.util.*;

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

    QContentCategory qContentCategory = QContentCategory.contentCategory;

    QMemberInterest qMemberInterest = QMemberInterest.memberInterest;

    QMemberBookmark qMemberBookmark = QMemberBookmark.memberBookmark;
    QMemberHistory qMemberHistory = QMemberHistory.memberHistory;

    /**
     * 최근 등록된 컨텐츠를 랜덤으로 가져온다.
     *
     * @param pageable
     * @return
     */
    public Page<Content> findRecentContentByCategory(List<Long> categoryIdList, Pageable pageable, Long lastContentId, int from, int to, Type type) {
        BooleanBuilder whereCondition = new BooleanBuilder();

        whereCondition.and(qContent.id.lt(lastContentId));
        whereCondition.and(qContent.id.eq(qContentCategory.content.id));
        whereCondition.and(qContentCategory.category.id.in(categoryIdList));
        whereCondition.and(qContent.timeCost.between(from, to));
        if(type != Type.ALL) whereCondition.and(qContent.type.eq(type));

        List<Content> contentList = jpaQueryFactory
                .select(qContent)
                .from(qContent, qContentCategory)
                .where(whereCondition)
                .orderBy(qContent.id.desc())
                .offset(0)
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(
                contentList,
                pageable,
                jpaQueryFactory
                        .select(qContent)
                        .from(qContent, qContentCategory)
                        .where(whereCondition)
                        .orderBy(qContent.id.desc())
                        .fetch().size()
        );
    }

    public Page<Content> findPopularContentByCategory(List<Long> categoryIdList, Pageable pageable, Long popularId, int from, int to, Type type) {
        BooleanBuilder whereCondition = new BooleanBuilder();

        // 조인 조건
        whereCondition.and(qContent.id.eq(qContentCategory.content.id));
        whereCondition.and(qContent.id.eq(qContentView.contentId));

        // 카테고리 서치
        whereCondition.and(qContentCategory.category.id.in(categoryIdList));

        // 페이징 조건
        whereCondition.and(qContentView.id.lt(popularId));

        // 시간 조건
        whereCondition.and(qContent.timeCost.between(from, to));

        // 컨텐츠 타입
        if(type != Type.ALL) whereCondition.and(qContent.type.eq(type));

        List<Content> contentList = jpaQueryFactory
                .select(qContent)
                .from(qContent, qContentView, qContentCategory)
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
                        .from(qContent, qContentView, qContentCategory)
                        .where(whereCondition)
                        .orderBy(qContentView.id.desc())
                        .fetch().size()
        );
    }

    public Page<Content> findRecentContentByTitleAndTag(String keyword, Pageable pageable, Long lastContentId, int from, int to, Type type) {
        BooleanBuilder whereCondition = new BooleanBuilder();
//        whereCondition.and(qContentTag.content.id.eq(qContent.id));
        whereCondition.and(qContent.id.lt(lastContentId));
//        whereCondition.and(containTitle(keyword).or(cotainTag(keyword)));
        whereCondition.and(qContent.title.contains(keyword));
        whereCondition.and(qContent.timeCost.between(from, to));
        if(type != Type.ALL) whereCondition.and(qContent.type.eq(type));


        List<Content> contents = jpaQueryFactory
            .select(qContent)
            .distinct()
//            .from(qContent, qContentTag)
            .from(qContent)
            .where(whereCondition)
            .orderBy(qContent.id.desc())
            .offset(0)
            .limit(pageable.getPageSize())
            .fetch();
        return new PageImpl<>(contents, pageable,
                jpaQueryFactory
                        .select(qContent)
                        .distinct()
//            .from(qContent, qContentTag)
                        .from(qContent)
                        .where(whereCondition)
                        .orderBy(qContent.id.desc())
                        .fetch().size());
    }

    public Page<Content> findPopularContentByTitleAndTag(String keyword, Pageable pageable, Long popularId, int from, int to, Type type) {
        BooleanBuilder whereCondition = new BooleanBuilder();
//        whereCondition.and(qContentTag.content.id.eq(qContent.id));
        whereCondition.and(qContent.id.eq(qContentView.contentId));
//        whereCondition.and(containTitle(keyword).or(cotainTag(keyword)));
        whereCondition.and(qContent.title.contains(keyword));
        whereCondition.and(qContentView.id.lt(popularId));
        whereCondition.and(qContent.timeCost.between(from, to));
        if(type != Type.ALL) whereCondition.and(qContent.type.eq(type));
        List<Content> contents = jpaQueryFactory
                .select(qContent)
//                .from(qContent, qContentView, qContentTag)
                .from(qContent, qContentView)
                .distinct()
                .where(whereCondition)
                .orderBy(qContentView.id.desc())
                .offset(0)
                .limit(pageable.getPageSize())
                .fetch();
        return new PageImpl<>(contents, pageable,
                jpaQueryFactory
                        .select(qContent)
//                .from(qContent, qContentView, qContentTag)
                        .from(qContent, qContentView)
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

    public Page<Content> findContentByRandom (Pageable pageable, int from, int to, Type type) {
        BooleanBuilder whereCondition = new BooleanBuilder();
        whereCondition.and(qContent.timeCost.between(from, to));

        if(type != Type.ALL) whereCondition.and(qContent.type.eq(type));
        List<OrderSpecifier> ORDERS = getOrderSpecifiers(pageable.getSort());

        List<Content> contentList = jpaQueryFactory
                .selectFrom(qContent)
                .where(whereCondition)
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
                        .where(whereCondition)
                        .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
                        .limit(pageable.getPageSize())
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

    public List<Long> findCategoryIdByCategory(String category) {
        return jpaQueryFactory
                .select(qCategory.id)
                .from(qCategory)
                .where(qCategory.mainName.like(category).or(qCategory.subName.like(category)))
                .fetch();
    }

    public List<Long> findCategoryIdByFavorite(Long memberId) {
        List<Long> categoryIdList = jpaQueryFactory
                .select(qCategory.id)
                .from(qCategory, qMemberInterest)
                .where(
                        qMemberInterest.member.id.eq(memberId),
                        qMemberInterest.category.id.eq(qCategory.id)
                )
                .fetch();
        return categoryIdList != null? categoryIdList: new ArrayList<>();
    }

    public Page<Content> findBookmarkedContent(Pageable pageable, int from, int to, Type type, Long memberId) {
        BooleanBuilder whereCondition = new BooleanBuilder();
        whereCondition.and(qMemberBookmark.member.id.eq(memberId));
        whereCondition.and(qContent.id.eq(qMemberBookmark.content.id));
        whereCondition.and(qContent.timeCost.between(from, to));

        if(type != Type.ALL) whereCondition.and(qContent.type.eq(type));
        List<OrderSpecifier> ORDERS = getOrderSpecifiers(pageable.getSort());

        List<Content> contentList = jpaQueryFactory
                .select(qContent)
                .from(qContent, qMemberBookmark)
                .where(whereCondition)
                .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

//        Collections.shuffle(contentList);

        return new PageImpl<>(
                (contentList != null) ? contentList: new ArrayList<>(),
                pageable,
                jpaQueryFactory
                        .select(qContent)
                        .from(qContent, qMemberBookmark)
                        .where(whereCondition)
                        .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
                        .limit(pageable.getPageSize())
                        .fetch()
                        .size()
        );
    }

    public Page<Content> findSimilarContent(Pageable pageable, int from, int to, Type type, List<Long> memberIdList) {
        BooleanBuilder whereCondition = new BooleanBuilder();
        whereCondition.and(qMemberHistory.member.id.in(memberIdList));
        whereCondition.and(qContent.id.eq(qMemberHistory.content.id));
        whereCondition.and(qContent.timeCost.between(from, to));
        if(type != Type.ALL) whereCondition.and(qContent.type.eq(type));

        List<OrderSpecifier> ORDERS = getOrderSpecifiers(pageable.getSort());
        List<Content> contentList = jpaQueryFactory
                .select(qContent).distinct()
                .from(qContent, qMemberHistory)
                .where(whereCondition)
                .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(
                (contentList != null) ? contentList: new ArrayList<>(),
                pageable,
                jpaQueryFactory
                        .select(qContent)
                        .from(qContent, qMemberHistory)
                        .where(whereCondition)
                        .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
                        .limit(pageable.getPageSize())
                        .fetch()
                        .size()
        );
    }
}