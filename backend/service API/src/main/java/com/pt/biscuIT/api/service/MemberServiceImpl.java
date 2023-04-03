package com.pt.biscuIT.api.service;

import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.repository.MemberRepository;
import com.pt.biscuIT.db.repository.MemberRepositorySupport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 회원 관련 서비스 정의.
  * author:
  * date:
 */

@Slf4j
@RequiredArgsConstructor
@Service("memberService")
public class MemberServiceImpl implements MemberService {
    MemberRepository memberRepository;
    MemberRepositorySupport memberRepositorySupport;

    public Member findMemberById(Long id) {
        if (memberRepository.findById(id).isPresent()) {
            return memberRepository.findById(id).get();
        }else {
            throw new IllegalArgumentException("해당 회원이 존재하지 않습니다.");
        }
    }

    @Override
    public Member findMemberByIdentifier(String identifier) {
        if (memberRepository.findByIdentifier(identifier).isPresent()) {
            return memberRepository.findByIdentifier(identifier).get();
        }else {
            return null;
        }
    }

    @Override
    public Member update(Member member) {
        memberRepository.save(member);
        return null;
    }
}
