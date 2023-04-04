package com.pt.biscuIT.db.entity;

import lombok.*;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberProfile implements Serializable {
	@Id
	private Long memberId;
	@MapsId
	@JoinColumn(name = "member_id")
	@OneToOne(fetch = FetchType.LAZY)
	private Member member;
	@Enumerated(EnumType.STRING)
	private Job job; //직무
	private Integer period; //연차
	private Integer exp; //경험치
}
