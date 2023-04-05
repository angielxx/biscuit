package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.db.entity.MemberBookmark;
import com.pt.biscuIT.db.entity.QMemberBookmark;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Transactional
public class MemberBookmarkRepositorySupport {
    private final EntityManager em;
    private final JPAQueryFactory jpaQueryFactory;
    QMemberBookmark qMemberBookmark = QMemberBookmark.memberBookmark;

    public boolean isMarked(Long memberId, Long contentId) {
        return jpaQueryFactory.selectFrom(qMemberBookmark)
                .where(
                        qMemberBookmark.member.id.eq(memberId),
                        qMemberBookmark.content.id.eq(contentId)
                )
                .fetchCount() > 0;
    }

    public Page<MemberBookmark> findBookmarkContentByMemberId(Long memberId, Pageable pageable, Long lastContentId) {
        BooleanBuilder whereCondition = new BooleanBuilder();
        whereCondition.and(qMemberBookmark.member.id.eq(memberId));
        whereCondition.and(qMemberBookmark.id.lt(lastContentId));

        List<MemberBookmark> bookmarks = jpaQueryFactory
                .selectFrom(qMemberBookmark)
                .where(whereCondition)
                .orderBy(qMemberBookmark.createdDate.desc())
                .offset(0)
                .limit(pageable.getPageSize())
                .fetch();

        return new PageImpl<>(
                bookmarks,
                pageable,
                jpaQueryFactory
                        .selectFrom(qMemberBookmark)
                        .where(whereCondition)
                        .orderBy(qMemberBookmark.createdDate.desc())
                        .fetch().size()
        );

    }
}
