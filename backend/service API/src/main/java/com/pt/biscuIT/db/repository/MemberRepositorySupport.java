package com.pt.biscuIT.db.repository;


import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.entity.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

/*
 * MemberRepositorySupport
 * @author 7unho
 * @since 2020-11-23
 */
@Repository
@RequiredArgsConstructor
public class MemberRepositorySupport {
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QMember qMember = QMember.member;


    public Member findByEmail(String email) {
        return jpaQueryFactory
                .selectFrom(qMember)
                .where(qMember.email.eq(email))
                .fetchOne();
    }
}
