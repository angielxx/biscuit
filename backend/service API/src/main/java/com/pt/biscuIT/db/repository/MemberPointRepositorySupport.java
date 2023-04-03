package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.db.entity.QMemberPoint;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
@Transactional
public class MemberPointRepositorySupport {
    private final EntityManager em;
    private final JPAQueryFactory jpaQueryFactory;

    QMemberPoint qMemberPoint = QMemberPoint.memberPoint;

    public Integer findPointByMemberId(Long memberId) {
        Integer point = jpaQueryFactory
                                        .select(qMemberPoint.totalPoints)
                                        .from(qMemberPoint)
                                        .where(qMemberPoint.member.id.eq(memberId))
                                        .fetchOne();
        return point == null ? 0 : point;
    }
}
