package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.api.dto.history.MemberGraphDto;
import com.pt.biscuIT.api.dto.history.MemberHistoryDto;
import com.pt.biscuIT.api.dto.history.QMemberGraphDto;
import com.pt.biscuIT.api.dto.history.QMemberHistoryDto;
import com.pt.biscuIT.db.entity.QCategory;
import com.pt.biscuIT.db.entity.QContentCategory;
import com.pt.biscuIT.db.entity.QMemberHistory;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Transactional
public class MemberHistoryRepositorySupport {
    private final EntityManager em;
    private final JPAQueryFactory jpaQueryFactory;

    QContentCategory qContentCategory = QContentCategory.contentCategory;
    QMemberHistory qMemberHistory = QMemberHistory.memberHistory;
    QCategory qCategory = QCategory.category;

    public List<MemberGraphDto> getGraphsByMemberId(Long memberId) {
        BooleanBuilder whereCondition = new BooleanBuilder();

        // join 절
        whereCondition.and(qMemberHistory.member.id.eq(memberId));
        whereCondition.and(qMemberHistory.content.id.eq(qContentCategory.content.id));
        whereCondition.and(qCategory.id.eq(qContentCategory.category.id));

        List<MemberGraphDto> graphs = jpaQueryFactory
                .select(new QMemberGraphDto(
                        QCategory.category.subName,
                        qCategory.id.count()
                ))
                .from(qCategory, qContentCategory, qMemberHistory)
                .where(whereCondition)
                .groupBy(qCategory.id)
                .orderBy(qCategory.id.count().desc())
                .limit(5)
                .fetch();

        return graphs;
    }

    public List<MemberHistoryDto> getHistoriesByMemberId(Long memberId) {
        BooleanBuilder whereCondition = new BooleanBuilder();

        whereCondition.and(qMemberHistory.member.id.eq(memberId));
        whereCondition.and(qMemberHistory.createdDate.between(
                LocalDateTime.of(LocalDate.now().minusWeeks(53), LocalTime.of(0, 0, 0)),
                LocalDateTime.of(LocalDate.now(), LocalTime.of(23, 59, 59))
                )
        );

        List<MemberHistoryDto> histories = jpaQueryFactory
                .select(new QMemberHistoryDto(
                        qMemberHistory.createdDate,
                        qMemberHistory.createdDate.count()
                ))
                .from(qMemberHistory)
                .where(whereCondition)
                .groupBy(Expressions.dateTemplate(
                        LocalDate.class,
                        "DATE_FORMAT({0}, '%Y-%m-%d')",
                        qMemberHistory.createdDate
                ))
                .fetch();

        return histories;
    }
}
