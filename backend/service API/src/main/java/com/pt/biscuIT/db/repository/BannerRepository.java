package com.pt.biscuIT.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.db.entity.Banner;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Long> {
}
