package com.pt.biscuIT.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class MemberInterest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberInterestId;
	@ManyToOne
	private Member member;
	@ManyToOne
	private Category category;
}
