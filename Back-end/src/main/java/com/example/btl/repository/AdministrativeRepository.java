package com.example.btl.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.btl.entity.Administrative;

public interface AdministrativeRepository extends JpaRepository<Administrative, Long> {
    public Optional<Administrative> findByCode(Long Id);
   
    
}
