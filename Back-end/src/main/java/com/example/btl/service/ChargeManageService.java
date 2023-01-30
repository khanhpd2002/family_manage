package com.example.btl.service;

import com.example.btl.entity.Charge;
import com.example.btl.entity.ChargeManage;
import com.example.btl.entity.People;
import com.example.btl.repository.ChargeManageRepository;
import com.example.btl.repository.FamilyRegisterRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import com.example.btl.entity.FamilyRegister;


@Service
public class ChargeManageService {
    @Autowired
    ChargeManageRepository chargeManageRepository;
    
    @Autowired
    FamilyRegisterRepository familyRegisterRepository;
    

    public ChargeManage update(Long charge_id, Long family_number, ChargeManage source) {
        Optional<ChargeManage> oChargeManage = chargeManageRepository.findByCharge_idAndFamily_numberIn(charge_id, family_number);
        
//        if (oChargeManage.isPresent()) {
	        ChargeManage chargeManage = oChargeManage.get();
//	        chargeManage.setCharge_id(source.getCharge_id());
//	        chargeManage.setFamily_number(source.getFamily_number());
	        chargeManage.setPayer(source.getPayer());
	        chargeManage.setPay_date(source.getPay_date());
	
	        this.chargeManageRepository.save(chargeManage);
	        return chargeManage;
//        }
        
    } 
    
    public List<FamilyRegister> findFamiliesByCharge_id(Long id){
    	List<FamilyRegister> fmList = new ArrayList<>();
    	
    	//lay cac family_id
    	List<Long> familyId = chargeManageRepository.findFamiliesByCharge_id(id);
    	System.out.println(familyId);
    	 
    	//lay cac family  
    	fmList = familyRegisterRepository.findAllByNumberIn(familyId); 
    	System.out.println("herre");

    	return fmList;
    }
}
