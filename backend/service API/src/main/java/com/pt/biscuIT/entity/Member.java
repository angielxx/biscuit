package com.pt.biscuIT.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Member implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String email;
	private SocialDomain socialDomain;
	private Role role;
	private LocalDateTime signupDate;
	private LocalDateTime withdrawDate;
	@OneToOne(fetch = FetchType.LAZY)
	private MemberProfile memberProfile;

}
