package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.api.dto.member.MemberRefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface MemberRefreshTokenRedisRepository extends CrudRepository<MemberRefreshToken, String> {
    MemberRefreshToken findByRefreshToken(String refreshToken);
    MemberRefreshToken findByMemberIdentifier(String memberIdentifier);
}
