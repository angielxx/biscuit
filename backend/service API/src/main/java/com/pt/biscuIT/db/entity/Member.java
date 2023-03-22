package com.pt.biscuIT.entity;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class Member implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String email;
	private SocialDomain socialDomain;
	private String nickname;
	private Role role;
	private LocalDateTime signupDate;
	private LocalDateTime withdrawDate;
	@OneToOne(fetch = FetchType.LAZY)
	private MemberProfile memberProfile;

}
