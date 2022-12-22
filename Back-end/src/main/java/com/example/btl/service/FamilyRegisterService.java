package com.example.btl.service;

import com.example.btl.entity.FamilyRegister;
import com.example.btl.repository.FamilyRegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FamilyRegisterService {
    @Autowired
    FamilyRegisterRepository familyRegisterRepository;

    public FamilyRegister update(Long id, FamilyRegister source) {
        Optional<FamilyRegister> oFamilyRegister = Optional.ofNullable(this.familyRegisterRepository.findById(id == null ? 0 : id));

        FamilyRegister familyRegister = oFamilyRegister.get();
        familyRegister.setNumber(source.getNumber());
        familyRegister.setNumberPeople(source.getNumberPeople());
        familyRegister.setOwner(source.getOwner());
        familyRegister.setProvince(source.getProvince());
        familyRegister.setDistrict(source.getDistrict());
        familyRegister.setWard(source.getWard());
        familyRegister.setAddress(source.getAddress());
        return this.familyRegisterRepository.save(familyRegister);
    }

    public ResponseEntity<Object> create(FamilyRegister src) {
        FamilyRegister fr = this.familyRegisterRepository.save(src);
        return new ResponseEntity<>(fr, HttpStatus.OK);
    }

}
