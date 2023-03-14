package com.pt.biscuIT.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class MemberPoint {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberPointId;
	@ManyToOne
	private Member member;
	private Integer changedPoints; //포인트 변동값
	private PointTrigger pointTrigger;
	private Integer totalPoints; //포인트 합계
}
