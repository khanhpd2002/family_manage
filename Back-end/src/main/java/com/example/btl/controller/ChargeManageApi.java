package com.example.btl.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.btl.entity.ChargeManage;
import com.example.btl.entity.FamilyRegister;
import com.example.btl.repository.ChargeManageRepository;
import com.example.btl.service.ChargeManageService;

@RestController
@RequestMapping("/charge_manage")
public class ChargeManageApi {
    @Autowired
    ChargeManageRepository chargeManageRepository;

    @Autowired
    ChargeManageService chargeManageService;

    @GetMapping()
    public List<ChargeManage> findAll() {
        return (List<ChargeManage>) chargeManageRepository.findAll();
    }

//    @GetMapping("/{id}")
//    public Optional<ChargeManage> findCharge_manageById(@PathVariable(name = "id", required = true) Long id) {
//        return chargeManageRepository.findById(id);
//    }
     
    @GetMapping("/charge/{id}")
    public List<ChargeManage> fiindCharge_manageByCharge_id(@PathVariable(name = "id", required = true) Long charge_id) {
        return chargeManageRepository.findByCharge_id(charge_id);
    }

//    @GetMapping("/params")
//    public List<ChargeManage> find(@RequestParam(name = "name", required = false) String name, @RequestParam(name = "amount", required = false) String amount,
//                             @RequestParam(name = "chargeType", required = false) String chargeType) {
//        List<ChargeManage> c = new ArrayList<>();
//        c = chargeManageRepository.find(name, amount, chargeType);
//        return c;
//    }

    @PostMapping()
    public ChargeManage create(@RequestBody ChargeManage newChargeManage) {
//    	System.out.println(newChargeManage.getName());
        return chargeManageRepository.saveAndFlush(newChargeManage);
    }
//
    @PatchMapping("/params")
    public ChargeManage update(@RequestParam(name = "charge_id", required = true) Long charge_id, @RequestParam(name = "family_number", required = true) Long family_number,
                         @RequestBody ChargeManage newChargeManage) {
        return chargeManageService.update(charge_id, family_number, newChargeManage);
    }
//
    @DeleteMapping(value ="/params")
    public void delete(@RequestParam(name = "charge_id", required = true) Long charge_id, @RequestParam(name="family_number", required = true) Long family_number) {
    	System.out.println(charge_id);
        chargeManageRepository.deleteByCharge_idAndFamily_number(charge_id, family_number);
    }
}
