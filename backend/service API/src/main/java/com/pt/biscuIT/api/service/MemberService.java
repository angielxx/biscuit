package com.pt.biscuIT.api.service;

import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.repository.MemberRepository;
import com.pt.biscuIT.db.repository.MemberRepositorySupport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 회원 관련 서비스 정의.
  * author:
  * date:
 */

@Slf4j
@RequiredArgsConstructor
@Service("memberService")
public class MemberService {
    MemberRepository memberRepository;
    MemberRepositorySupport memberRepositorySupport;

    public Member findMemberById(Long id) {
        if (memberRepository.findById(id).isPresent()) {
            return memberRepository.findById(id).get();
        }else {
            throw new IllegalArgumentException("해당 회원이 존재하지 않습니다.");
        }
    }

    public Member findMemberByEmail(String email) {
        if (memberRepository.findByEmail(email).isPresent()) {
            return (Member) memberRepository.findByEmail(email).get();
        }else {
            throw new IllegalArgumentException("해당 회원이 존재하지 않습니다.");
        }
    }

    public Member findMemberByIdentifier(String identifier) {
        if (memberRepository.findByIdentifier(identifier).isPresent()) {
            return (Member) memberRepository.findByIdentifier(identifier).get();
        }else {
            throw new IllegalArgumentException("해당 회원이 존재하지 않습니다.");
        }
    }
}
