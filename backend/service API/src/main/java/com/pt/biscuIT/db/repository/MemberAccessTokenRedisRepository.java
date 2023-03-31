package com.pt.biscuIT.db.repository;

import com.pt.biscuIT.api.dto.member.MemberRefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface MemberAccessTokenRedisRepository extends CrudRepository<MemberRefreshToken, String> {
    MemberRefreshToken findByAccessToken(String accessToken);
    MemberRefreshToken findByUseremail(String useremail);
}
