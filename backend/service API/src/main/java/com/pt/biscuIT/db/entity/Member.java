package com.pt.biscuIT.db.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true)
	private String identifier;		// provider + provider에서 제공하는 고유 식별자
	private String email;
	@Enumerated(EnumType.STRING)
	private Provider provider;
	private String nickname;
	@Enumerated(EnumType.STRING)
	private Role role;
	@CreatedDate
	private LocalDateTime signupDate;
	private LocalDateTime withdrawDate;

	public Member(Member member, String email) {
		this.id = member.getId();
		this.identifier = member.getIdentifier();
		this.email = email;
		this.provider = member.getProvider();
		this.nickname = member.getNickname();
		this.role = member.getRole();
		this.signupDate = member.getSignupDate();
		this.withdrawDate = member.getWithdrawDate();
	}

	@Override
	public String toString() {
		return "Member{" +
				"id=" + id +
				", identifier='" + identifier + '\'' +
				", email='" + email + '\'' +
				", provider=" + provider +
				", nickname='" + nickname + '\'' +
				", role=" + role +
				", signupDate=" + signupDate +
				", withdrawDate=" + withdrawDate +
				'}';
	}
}
