package com.example.btl.repository;

import com.example.btl.entity.People;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface PeopleRepository extends JpaRepository<People, Integer> {
    public People findById(Long id);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM people WHERE id = ?1", nativeQuery = true)
    public void deleteById(Long id);
}
