package com.example.btl.controller;

import com.example.btl.entity.FamilyRegister;
import com.example.btl.repository.FamilyRegisterRepository;
import com.example.btl.service.FamilyRegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    @GetMapping("/params")
    public List<FamilyRegister> find(@RequestParam(required = false) Long number,
                                     @RequestParam(required = false) String owner, @RequestParam(required = false) String province,
                                     @RequestParam(required = false) String district, @RequestParam(required = false) String ward,
                                     @RequestParam(required = false) String address) {
        List<FamilyRegister> fr = new ArrayList<>();
        fr = this.familyRegisterRepository.find(number, owner, province, district, ward, address);
        return fr;
    }

    @GetMapping("/{id}")
    public FamilyRegister findById(@PathVariable(name = "id", required = true) Long id) {
        return familyRegisterRepository.findById(id == null ? 0 : id);
    }

    @PostMapping()
    public ResponseEntity create(@RequestBody FamilyRegister newFamilyRegister) {
        return this.familyRegisterService.create(newFamilyRegister);
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
