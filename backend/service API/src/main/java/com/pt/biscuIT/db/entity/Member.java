package com.pt.biscuIT.db.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.*;

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
	@OneToOne(fetch = FetchType.LAZY)
	private MemberProfile memberProfile;

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
