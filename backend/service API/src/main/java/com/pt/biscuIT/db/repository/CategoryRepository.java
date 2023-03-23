package com.pt.biscuIT.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.db.entity.Category;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query(
            value = "SELECT distinct main_name, code" +
                    "FROM category",
            nativeQuery = true
    )
    List<Category> findCodeAndMainNameList();
}
