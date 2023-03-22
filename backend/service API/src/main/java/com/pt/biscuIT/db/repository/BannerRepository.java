package com.pt.biscuIT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.entity.Banner;
import com.pt.biscuIT.entity.Category;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Long> {
}
