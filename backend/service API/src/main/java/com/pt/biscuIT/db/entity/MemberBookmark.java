package com.pt.biscuIT.db.entity;

import org.springframework.data.annotation.CreatedDate;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class MemberBookmark implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne(fetch = FetchType.LAZY)
	private Member member;
	@ManyToOne(fetch = FetchType.LAZY)
	private Content content;
	// TODO: content 삭제 시 MemberBookmark도 삭제시키기
	@CreatedDate
	private LocalDateTime createdDate;
}
