package com.pt.biscuIT.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.db.entity.Category;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query(
            value = "SELECT mainName, code " +
                    "FROM Category " +
                    "GROUP BY mainName, substring(code, 0, 2) "
    )
    List<String> findCodeAndMainNameList();

//    @Query(
//            value = "SELECT sub_name, substring(code, 3, 5) " +
//                    "FROM category " +
//                    "WHERE code LIKE :code% ",
//            nativeQuery = true
//    )
//    List<String> findSubCategoryList(String code);
}
