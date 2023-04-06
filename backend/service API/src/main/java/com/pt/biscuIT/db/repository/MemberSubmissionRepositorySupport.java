package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.db.entity.MemberSubmission;
import com.pt.biscuIT.db.entity.QMemberSubmission;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class MemberSubmissionRepositorySupport {
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QMemberSubmission qMemberSubmission = QMemberSubmission.memberSubmission;

    public MemberSubmission findMemberSubmissionByMemeberIdAndQuizId(Long memberId, Long quizId) {
        return jpaQueryFactory.selectFrom(QMemberSubmission.memberSubmission)
                .where(QMemberSubmission.memberSubmission.member.id.eq(memberId))
                .where(QMemberSubmission.memberSubmission.quiz.id.eq(quizId))
                .fetchOne();
    }
}
