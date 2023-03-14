package com.pt.biscuIT.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class MemberProfile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberProfileId;
	@OneToOne(mappedBy = "memberProfile")
	private Member member;
	private Job job; //직무
	private Integer period; //연차
	private Integer exp; //경험치
}
