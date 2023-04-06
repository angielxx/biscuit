package com.pt.biscuIT.db.repository;


import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManager;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.pt.biscuIT.db.entity.QCategory;
import com.pt.biscuIT.db.entity.QContent;
import com.pt.biscuIT.db.entity.QContentCategory;
import com.pt.biscuIT.db.entity.QContentTag;
import com.pt.biscuIT.db.entity.QContentView;
import com.pt.biscuIT.db.entity.QTag;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
@Transactional
public class ContentTageRepositorySupport {
    private final EntityManager em;

    private final JPAQueryFactory jpaQueryFactory;

    QContent qContent = QContent.content;
    QCategory qCategory = QCategory.category;
    QContentTag qContentTag = QContentTag.contentTag;
    QTag qTag = QTag.tag;

    QContentView qContentView = QContentView.contentView;

    QContentCategory qContentCategory = QContentCategory.contentCategory;

    public List<String> findTagsByContentId(Long contentId) {
        BooleanBuilder whereCondition = new BooleanBuilder();
        whereCondition.and(qContent.id.eq(contentId));
        whereCondition.and(qContent.id.eq(qContentTag.content.id));
        whereCondition.and(qTag.id.eq(qContentTag.tag.id));
        Object[] objects = jpaQueryFactory
                .select(qTag.name)
                .from(qContentTag, qContent, qTag)
                .where(whereCondition)
                .fetch()
                .toArray();
        String[] tags = Arrays.copyOf(objects, objects.length, String[].class);
        return Arrays.asList(tags);
    }
}