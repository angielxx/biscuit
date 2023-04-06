package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.history.MemberGraphDto;
import com.pt.biscuIT.api.dto.history.MemberHistoryDto;
import com.pt.biscuIT.api.dto.member.MemberDto;
import com.pt.biscuIT.api.dto.member.MemberInfoDto;
import com.pt.biscuIT.common.exception.MemberNotFoundException;
import com.pt.biscuIT.db.entity.*;
import com.pt.biscuIT.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 회원 관련 서비스 정의.
  * author:
  * date:
 */

@Slf4j
@RequiredArgsConstructor
@Service("memberService")
public class MemberServiceImpl implements MemberService {
    private final CategoryRepository categoryRepository;
    private final MemberRepository memberRepository;
    private final MemberRepositorySupport memberRepositorySupport;
    private final MemberPointRepositorySupport memberPointRepositorySupport;
    private final MemberProfileRepository memberProfilerepository;
    private final MemberHistoryRepositorySupport memberHistoryRepositorySupport;
    private final MemberBookmarkRepository memberBookmarkRepository;
    private final MemberInterestRepository memberInterestRepository;


    @Override
    public Member findByIdentifier(String identifier) {
        Optional<Member> member = memberRepository.findByIdentifier(identifier);
        if (member.isPresent()) {
            return member.get();
        }else {
            throw new MemberNotFoundException("해당 회원이 존재하지 않습니다.");
        }
    }

    @Override
    @Transactional
    public Member update(Member member) {
        if (memberRepository.findById(member.getId()).isPresent()) {
            return memberRepository.save(member);
        } else {
            throw new MemberNotFoundException("해당 회원이 존재하지 않습니다.");
        }
    }

    public List<MemberHistoryDto> getHistoriesByMember(Member member) {
        List<MemberHistoryDto> res = memberHistoryRepositorySupport.getHistoriesByMemberId(member.getId());
        return res == null ? new ArrayList<>() : res;
    }

    public List<MemberGraphDto> getGraphsByMember(Member member) {
        List<MemberGraphDto> res = memberHistoryRepositorySupport.getGraphsByMemberId(member.getId());
        return res == null? new ArrayList<>() : res;
    }

    public Integer getPointByMember(Member member) {
        return memberPointRepositorySupport.findPointByMemberId(member.getId());
    }


    @Override
    @Transactional
    public void updateProfile(MemberProfile profile) {
        if (memberProfilerepository.findById(profile.getMemberId()).isPresent()) {
            memberProfilerepository.save(profile);
        }else {
            throw new MemberNotFoundException("해당 회원이 존재하지 않습니다.");
        }
    }

    @Override
    public MemberInterest saveMemberInterest(MemberInterest memberInterest) {
        return memberInterestRepository.save(memberInterest);
    }

    @Override
    public List<Category> getInterestList(Member member) {
        List<MemberInterest> interestList =  memberInterestRepository.findAllByMemberId(member.getId());
        return interestList.stream().map(MemberInterest::getCategory).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public MemberProfile getMemberProfileByMemberId(Long id) {
        if (memberProfilerepository.findById(id).isPresent()) {
            return memberProfilerepository.findById(id).get();
        }else {
            throw new MemberNotFoundException("해당 회원이 존재하지 않습니다.");
        }
    }

    @Override
    @Transactional
    public void updateMemberInfo(MemberInfoDto memberInfoDto) {
        Optional<Member> member = memberRepository.findById(memberInfoDto.getMemberId());
        if (member.isPresent()) {
            // nickname 정보 업데이트
            updateMemberNickNameAndRole(member.get(), memberInfoDto.getNickname());
            // job, period 정보 업데이트
            MemberProfile profile = MemberProfile.builder()
                    .memberId(memberInfoDto.getMemberId())
                    .job(Job.valueOf(memberInfoDto.getJob()))
                    .period(memberInfoDto.getPeriod())
                    .build();
            updateProfile(profile);
            // intrests 정보 업데이트
            memberInterestRepository.deleteAllByMemberId(memberInfoDto.getMemberId());
            for (String interest : memberInfoDto.getInterests()) {
                Category category = categoryRepository.findBySubName(interest);
                memberInterestRepository.save(MemberInterest.builder()
                        .member(member.get())
                        .category(category)
                        .build());
            }
        }else {
            throw new MemberNotFoundException("해당 회원이 존재하지 않습니다.");
        }
    }


    void updateMemberNickNameAndRole(Member member, String nickname) {
        MemberDto memberDto = new MemberDto(member);
        memberDto.setNickname(nickname);
        // TODO ENUM 값이 잘못 들어올 경우 Exception 처리
        memberDto.setRole(Role.ROLE_MEMBER);
        memberRepository.save(memberDto.toEntity());
    }

}
