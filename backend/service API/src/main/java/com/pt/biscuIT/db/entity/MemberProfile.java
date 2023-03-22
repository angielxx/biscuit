package com.pt.biscuIT.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

@Entity
public class MemberProfile implements Serializable {
	@Id
	private Long memberId;
	@MapsId
	@JoinColumn(name = "member_id")
	@OneToOne(fetch = FetchType.LAZY)
	private Member member;
	private Job job; //직무
	private Integer period; //연차
	private Integer exp; //경험치
}
