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
	
    public Administrative update(Long id, Administrative source) {
        Optional<Administrative> opt = administrativeRepository.findById(id == null ? 0 : id);
        Administrative administrative = opt.get();

        administrative.setAdministrativeType(source.getAdministrativeType());
        administrative.setFrom(source.getFrom());
        administrative.setPaper_code(source.getPaper_code());
        administrative.setPeople_id(source.getPeople_id());
        administrative.setReason(source.getReason());
        administrative.setRegister_phone(source.getRegister_phone());
        administrative.setTo(source.getTo());
        
        return administrativeRepository.saveAndFlush(administrative);
    }
}
