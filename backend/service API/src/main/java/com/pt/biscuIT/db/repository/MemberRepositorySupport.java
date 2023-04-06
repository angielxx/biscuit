package com.pt.biscuIT.db.repository;


import com.pt.biscuIT.common.exception.BiscuitException;
import com.pt.biscuIT.common.exception.ErrorCode;
import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.entity.MemberProfile;
import com.pt.biscuIT.db.entity.QMemberProfile;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

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

    QMemberProfile qMemberProfile = QMemberProfile.memberProfile;

    public List<Long> findMemberIdBySimilarity(Member member) {
        BooleanBuilder whereCondition = new BooleanBuilder();

        MemberProfile memberProfile = jpaQueryFactory.selectFrom(qMemberProfile)
                .where(qMemberProfile.member.id.eq(member.getId()))
                .fetchOne();

        if(memberProfile == null) throw new BiscuitException(ErrorCode.MEMBER_PROFILE_NOT_SETTING);

        whereCondition.and(qMemberProfile.job.eq(memberProfile.getJob()));
        whereCondition.or(qMemberProfile.period.between(memberProfile.getPeriod() - 1, memberProfile.getPeriod() + 1));

        return jpaQueryFactory.select(qMemberProfile.member.id)
                .from(qMemberProfile)
                .where(whereCondition)
                .fetch();
    }
}
