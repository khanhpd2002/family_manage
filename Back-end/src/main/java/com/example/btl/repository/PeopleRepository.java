package com.example.btl.repository;

import com.example.btl.entity.People;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PeopleRepository extends JpaRepository<People, Integer> {
    public People findById(Long id);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM people WHERE id = ?1", nativeQuery = true)
    public void deleteById(Long id);


    @Query(value = "SELECT * FROM people pp WHERE (:name IS NULL OR LOWER(pp.name) LIKE LOWER(CONCAT('%',:name,'%'))) " +
            "AND (:otherName IS NULL OR LOWER(pp.other_name) LIKE LOWER(CONCAT('%',:otherName,'%'))) " +
            "AND (:birthday IS NULL OR LOWER(pp.birthday) LIKE LOWER(CONCAT('%',:birthday,'%'))) " +
            "AND (:province IS NULL OR LOWER(pp.province) LIKE LOWER(CONCAT('%',:province,'%'))) " +
            "AND (:district IS NULL OR LOWER(pp.district) LIKE LOWER(CONCAT('%',:district,'%'))) " +
            "AND (:ward IS NULL OR LOWER(pp.ward) LIKE LOWER(CONCAT('%',:ward,'%'))) " +
            "AND (:address IS NULL OR LOWER(pp.address) LIKE LOWER(CONCAT('%',:address,'%')))  " +
            "AND (:placeOfBirth IS NULL OR LOWER(pp.place_of_birth) LIKE LOWER(CONCAT('%',:placeOfBirth,'%'))) " +
            "AND (:ethnic IS NULL OR LOWER(pp.ethnic) LIKE LOWER(CONCAT('%',:ethnic,'%'))) " +
            "AND (:placeOfJob IS NULL OR LOWER(pp.place_of_job) LIKE LOWER(CONCAT('%',:placeOfJob,'%'))) " +
            "AND (:identityCard IS NULL OR LOWER(pp.identity_card) LIKE LOWER(CONCAT('%',:identityCard,'%'))) " +
            "AND (:relationshipWithOwner IS NULL OR LOWER(pp.relationship_with_owner) LIKE LOWER(CONCAT('%',:relationshipWithOwner,'%'))) " +
            "AND (:note IS NULL OR LOWER(pp.note) LIKE LOWER(CONCAT('%',:note,'%'))) ", nativeQuery = true)
    public List<People> find(String name, String otherName, String birthday, String province, String district, String ward,
                             String address, String placeOfBirth, String ethnic, String placeOfJob, String identityCard,
                             String relationshipWithOwner, String note);
}
