package com.example.btl.repository;

import com.example.btl.entity.FamilyRegister;
import com.example.btl.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface FamilyRegisterRepository extends JpaRepository<FamilyRegister, Integer>{
    public FamilyRegister findById(Long id);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM family_register WHERE id = ?1", nativeQuery = true)
    public void deleteById(Long id);
}
