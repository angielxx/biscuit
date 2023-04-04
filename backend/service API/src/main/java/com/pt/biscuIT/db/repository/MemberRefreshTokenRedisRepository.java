package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.db.entity.MemberRefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface MemberRefreshTokenRedisRepository extends CrudRepository<MemberRefreshToken, String> {
    MemberRefreshToken findByRefreshToken(String refreshToken);
    MemberRefreshToken findByIdentifier(String Identifier);
    MemberRefreshToken save(MemberRefreshToken memberRefreshToken);
}
