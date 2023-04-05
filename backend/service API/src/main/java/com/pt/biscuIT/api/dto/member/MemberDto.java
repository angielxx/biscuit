package com.pt.biscuIT.api.dto.member;

import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.entity.MemberProfile;
import com.pt.biscuIT.db.entity.Provider;
import com.pt.biscuIT.db.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class MemberDto {
    private Long id;
    private String identifier;
    private String email;
    private Provider provider;
    private String nickname;
    private Role role;
    private LocalDateTime signupDate;
    private LocalDateTime withdrawDate;
    private MemberProfile memberProfile;

    public MemberDto(Member member){
        this.id = member.getId();
        this.identifier = member.getIdentifier();
        this.email = member.getEmail();
        this.provider = member.getProvider();
        this.nickname = member.getNickname();
        this.role = member.getRole();
        this.signupDate = member.getSignupDate();
        this.withdrawDate = member.getWithdrawDate();
        this.memberProfile = member.getMemberProfile();
    }

    public Member toEntity(){
        return Member.builder()
                .id(this.getId())
                .identifier(this.getIdentifier())
                .email(this.getEmail())
                .provider(this.getProvider())
                .nickname(this.getNickname())
                .role(this.getRole())
                .signupDate(this.getSignupDate())
                .withdrawDate(this.getWithdrawDate())
                .memberProfile(this.getMemberProfile())
                .build();
    }
}
