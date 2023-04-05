package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.history.MemberGraphDto;
import com.pt.biscuIT.api.dto.history.MemberHistoryDto;
import com.pt.biscuIT.api.dto.member.MemberDto;
import com.pt.biscuIT.common.exception.MemberNotFoundException;
import com.pt.biscuIT.db.entity.*;
import com.pt.biscuIT.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
    private final MemberRepository memberRepository;
    private final MemberRepositorySupport memberRepositorySupport;
    private final MemberPointRepositorySupport memberPointRepositorySupport;
    private final MemberProfileRepository memberProfilerepository;
    private final MemberHistoryRepositorySupport memberHistoryRepositorySupport;
    private final MemberBookmarkRepository memberBookmarkRepository;
    private final MemberInterestRepository memberInterestRepository;

    public Member findMemberById(Long id) {
        if (memberRepository.findById(id).isPresent()) {
            return memberRepository.findById(id).get();
        }else {
            throw new MemberNotFoundException("해당 회원이 존재하지 않습니다.");
        }
    }

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
    public Member update(Member member) {
        memberRepository.save(member);
        return null;
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
    public MemberProfile updateProfile(MemberProfile profile) {
        if (memberProfilerepository.findById(profile.getMemberId()).isPresent()) {
            return memberProfilerepository.save(profile);
        }else {
            throw new MemberNotFoundException("해당 회원이 존재하지 않습니다.");
        }
    }

    @Override
    public MemberInterest saveMemberInterest(MemberInterest memberInterest) {
        return memberInterestRepository.save(memberInterest);
    }

    @Override
    public void updateNickName(Member member, String nickname) {
        MemberDto memberDto = new MemberDto(member);
        memberDto.setNickname(nickname);
        memberRepository.save(memberDto.toEntity());
    }

    @Override
    public void updateRole(Member member, String roleUser) {
        MemberDto memberDto = new MemberDto(member);
        memberDto.setRole(Role.valueOf(roleUser.toUpperCase()));
        // TODO ENUM 값이 잘못 들어올 경우 Exception 처리
        memberRepository.save(memberDto.toEntity());
    }

    @Override
    public List<Category> getInterestList(Member member) {
        List<MemberInterest> interestList =  memberInterestRepository.findAllByMemberId(member.getId());
        return interestList.stream().map(MemberInterest::getCategory).collect(Collectors.toList());
    }

    @Override
    public MemberProfile getMemberProfileByMemberId(Long id) {
        if (memberProfilerepository.findById(id).isPresent()) {
            return memberProfilerepository.findById(id).get();
        }else {
            throw new MemberNotFoundException("해당 회원이 존재하지 않습니다.");
        }
    }
}
