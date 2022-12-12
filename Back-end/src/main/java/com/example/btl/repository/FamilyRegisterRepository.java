package com.example.btl.repository;

import com.example.btl.entity.FamilyRegister;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface FamilyRegisterRepository extends JpaRepository<FamilyRegister, Integer> {
    public FamilyRegister findById(Long id);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM family_register WHERE id = ?1", nativeQuery = true)
    public void deleteById(Long id);

    @Query(value = "SELECT * FROM family_register fr WHERE (:number IS NULL OR fr.number = :number)" +
            "AND (:owner IS NULL OR LOWER(fr.owner) LIKE LOWER(CONCAT('%',:owner,'%')))" +
            "AND (:province IS NULL OR LOWER(fr.province) LIKE LOWER(CONCAT('%',:province,'%'))) " +
            "AND (:district IS NULL OR LOWER(fr.district) LIKE LOWER(CONCAT('%',:district,'%'))) " +
            "AND (:ward IS NULL OR LOWER(fr.ward) LIKE LOWER(CONCAT('%',:ward,'%'))) " +
            "AND (:address IS NULL OR LOWER(fr.address) LIKE LOWER(CONCAT('%',:address,'%')))  ", nativeQuery = true)
    public List<FamilyRegister> find(Long number, String owner, String province, String district, String ward, String address);
}
