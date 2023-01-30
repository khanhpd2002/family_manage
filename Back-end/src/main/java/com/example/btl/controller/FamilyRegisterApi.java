package com.example.btl.controller;

import com.example.btl.entity.FamilyRegister;
import com.example.btl.repository.FamilyRegisterRepository;
import com.example.btl.service.FamilyRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.example.btl.repository.PeopleRepository;
import com.example.btl.repository.ChargeManageRepository;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.security.DeclareRoles;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.servlet.annotation.HttpConstraint;
import javax.servlet.annotation.ServletSecurity.TransportGuarantee;


@RestController
@RequestMapping("/family-register")
@PreAuthorize("hasAuthority('user')")
public class FamilyRegisterApi {
    @Autowired
    private FamilyRegisterRepository familyRegisterRepository;
    
    @Autowired PeopleRepository peopleRepository;
    @Autowired ChargeManageRepository chargeManageRepository;
    @Autowired
    private FamilyRegisterService familyRegisterService;

    @GetMapping()
    public List<FamilyRegister> findAll() {
        return (List<FamilyRegister>) familyRegisterRepository.findAll();
    }

    @GetMapping("/params")
    public List<FamilyRegister> find(@RequestParam(required = false) Long number,
                                     @RequestParam(required = false) String owner, @RequestParam(required = false) String province,
                                     @RequestParam(required = false) String district, @RequestParam(required = false) String ward,
                                     @RequestParam(required = false) String address) {
        List<FamilyRegister> fr = new ArrayList<>();
        fr = this.familyRegisterRepository.find(number, owner, province, district, ward, address);
        return fr;
    }
  
    @GetMapping("/{number}")
    public FamilyRegister findById(@PathVariable(name = "number", required = true) Long number) {
        return familyRegisterRepository.findByNumber(number == null ? 0 : number);
    }

    @PostMapping()
    public ResponseEntity<Object> create(@RequestBody FamilyRegister newFamilyRegister) {
//    	System.out.println(newFamilyRegister);
        return this.familyRegisterService.create(newFamilyRegister);
    }

    @PatchMapping("{number}")
    public FamilyRegister update(@PathVariable(name = "number", required = true) Long number,
                                 @RequestBody FamilyRegister newFamilyRegister) {
        return familyRegisterService.update(number, newFamilyRegister);
    }

    @DeleteMapping("/{number}")
    public void delete(@PathVariable(name = "number", required = true) Long number) {
    	System.out.println("here");
    	chargeManageRepository.deleteByFamily_number(number);
    	peopleRepository.deleteByFamily_number(number);
        familyRegisterRepository.deleteByNumber(number);
    }
}
