package com.example.btl.repository;

import com.example.btl.entity.FamilyRegister;
import com.example.btl.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.ResponseEntity;

public interface FamilyRegisterRepository extends JpaRepository<FamilyRegister, Integer>{
    public FamilyRegister findById(Long id);
    public FamilyRegister deleteById(Long id);
}
