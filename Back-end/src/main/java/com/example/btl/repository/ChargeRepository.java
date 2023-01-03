package com.example.btl.repository;

import com.example.btl.entity.Charge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ChargeRepository extends JpaRepository<Charge, Integer> {
    public Charge findById(Long id);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM charge WHERE id = ?1", nativeQuery = true)
    public Charge deleteById(Long id);

    @Query(value = "SELECT * FROM charge c WHERE (:name IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%',:name,'%'))) " +
                    "AND (:amount IS NULL OR LOWER(c.amount) LIKE LOWER(CONCAT('%',:amount,'%'))) " +
                    "AND (:chargeType IS NULL OR LOWER(c.charge_type) LIKE LOWER(CONCAT('%',:chargeType,'%'))) " +
                    "AND (:unit IS NULL OR LOWER(c.unit) LIKE LOWER(CONCAT('%',:unit,'%'))) ", nativeQuery = true)
    public List<Charge> find(String name, String amount, String chargeType, String unit);
}
