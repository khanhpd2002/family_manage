package com.example.btl.controller;

import com.example.btl.entity.FamilyRegister;
import com.example.btl.repository.FamilyRegisterRepository;
import com.example.btl.service.FamilyRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/family-register")
public class FamilyRegisterApi {
    @Autowired
    private FamilyRegisterRepository familyRegisterRepository;

    @Autowired
    private FamilyRegisterService familyRegisterService;

    @GetMapping()
    public List<FamilyRegister> findAll() {
        return (List<FamilyRegister>) familyRegisterRepository.findAll();
    }

    @GetMapping("/{id}")
    public FamilyRegister findById(@PathVariable(name = "id", required = true) Long id) {
        return familyRegisterRepository.findById(id == null ? 0 : id);
    }

    @PostMapping()
    public FamilyRegister create(@RequestBody FamilyRegister newFamilyRegister) {
        return familyRegisterRepository.save(newFamilyRegister);
    }

    @PatchMapping("{id}")
    public FamilyRegister update(@PathVariable(name = "id", required = true) Long id,
            @RequestBody FamilyRegister newFamilyRegister) {
        return familyRegisterService.update(id, newFamilyRegister);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable(name = "id", required = true) Long id) {
        familyRegisterRepository.deleteById(id == null ? 0 : id);
    }
}
