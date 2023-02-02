package com.example.btl.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.btl.entity.Administrative;
import com.example.btl.entity.People;
import com.example.btl.repository.AdministrativeRepository;

@Service
public class AdministrativeService {
	@Autowired AdministrativeRepository administrativeRepository;
	
    public Administrative update(Long code, Administrative source) {
        Optional<Administrative> opt = administrativeRepository.findByCode(code == null ? 0 : code);
        Administrative administrative = opt.get();

        administrative.setAdministrativeType(source.getAdministrativeType());
        administrative.setFrom(source.getFrom());
        administrative.setCode(source.getCode());
        administrative.setPeople_id(source.getPeople_id());
        administrative.setReason(source.getReason());
        administrative.setRegister_phone(source.getRegister_phone());
        administrative.setTo(source.getTo());
        
        return administrativeRepository.saveAndFlush(administrative);
    }
}
