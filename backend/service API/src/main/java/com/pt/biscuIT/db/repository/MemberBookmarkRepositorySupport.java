package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.db.entity.QMemberBookmark;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

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
}
