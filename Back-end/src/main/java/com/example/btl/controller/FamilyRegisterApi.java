package com.example.btl.controller;

import com.example.btl.entity.FamilyRegister;
import com.example.btl.repository.FamilyRegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FamilyRegisterApi {
    @Autowired
    private FamilyRegisterRepository familyRegisterRepository;

    @GetMapping("/abc")
    public String abc() {
        System.out.println("abccahs");
        return "HelloWorld";
    }

    @GetMapping("/family-register/getAll")
    public List<FamilyRegister> getFamilyRegister() {
        System.out.println("Family Register");
        return (List<FamilyRegister>) familyRegisterRepository.findAll();
    }

    @PostMapping("/family-register")
    public FamilyRegister postFamilyRegister(@RequestBody FamilyRegister newFamilyRegister) {
        return familyRegisterRepository.save(newFamilyRegister);
    }
}
