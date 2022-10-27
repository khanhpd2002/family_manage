package com.example.btl.repository;

import com.example.btl.entity.FamilyRegister;
import org.springframework.data.jpa.repository.JpaRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface FamilyRegisterRepository extends JpaRepository<FamilyRegister, Integer> {

}
