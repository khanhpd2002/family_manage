package com.example.btl.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.btl.entity.Charge;
import com.example.btl.entity.ChargeManage;

@Repository 
public interface ChargeManageRepository extends JpaRepository<ChargeManage, Long> {
	@Query(value = "SELECT c.family_id FROM charge_manage c WHERE c.charge_id = :id ", nativeQuery = true)
	public List<Long> findFamiliesByCharge_id(Long id);
	
	@Query(value = "SELECT * FROM charge_manage c WHERE (c.charge_id=:charge_id)", nativeQuery = true)
	public List<ChargeManage> findByCharge_id(Long charge_id);
	
//	@Query(value = "SELECT * FROM charge_manage c WHERE (c.charge_id=:charge_id)", nativeQuery = true)
//	public List<ChargeManage> findByCharge_id(Long charge_id);
	
	@Query(value = "SELECT * FROM charge_manage c WHERE (c.charge_id=:charge_id)" +
	" AND (c.family_number=:family_number)"
	, nativeQuery = true)  
	public Optional<ChargeManage> findByCharge_idAndFamily_numberIn(Long charge_id, Long family_number);
	 
	@Modifying
	@Transactional
	@Query(value = "delete FROM charge_manage c WHERE (c.charge_id=:charge_id) " +
	"AND (c.family_number=:family_number)", 
	nativeQuery = true)
	public void deleteByCharge_idAndFamily_number(Long charge_id, Long family_number);
	
	@Modifying
	@Transactional
	@Query(value = "delete FROM charge_manage c WHERE (c.family_number=:family_number)", 
	nativeQuery = true)
	public void deleteByFamily_number(Long family_number);
}
