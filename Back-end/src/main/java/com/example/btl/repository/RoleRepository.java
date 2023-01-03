package com.example.btl.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.btl.entity.Role;
 
public interface RoleRepository extends JpaRepository<Role, Integer> {
 
}