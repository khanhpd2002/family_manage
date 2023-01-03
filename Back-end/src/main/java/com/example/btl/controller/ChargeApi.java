package com.example.btl.controller;

import com.example.btl.entity.Charge;
import com.example.btl.repository.ChargeRepository;
import com.example.btl.service.ChargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/charge")
public class ChargeApi {
    @Autowired
    ChargeRepository chargeRepository;

    @Autowired
    ChargeService chargeService;

    @GetMapping()
    public List<Charge> findAll() {
        return (List<Charge>) chargeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Charge findById(@PathVariable(name = "id", required = true) Long id) {
        return chargeRepository.findById(id);
    }

    @GetMapping("/params")
    public List<Charge> find(@RequestParam(name = "name", required = false) String name, @RequestParam(name = "amount", required = false) String amount,
                             @RequestParam(name = "chargeType", required = false) String chargeType, @RequestParam(name = "unit", required = false) String unit) {
        List<Charge> c = new ArrayList<>();
        c = this.chargeRepository.find(name, amount, chargeType, unit);
        return c;
    }

    @PostMapping()
    public Charge create(@RequestBody Charge newCharge) {
        return chargeRepository.save(newCharge);
    }

    @PatchMapping("/{id}")
    public Charge update(@PathVariable(name = "id", required = true) Long id,
                         @RequestBody Charge newCharge) {
        return chargeService.update(id, newCharge);
    }

    @DeleteMapping("/id")
    public Charge delete(@PathVariable(name = "id", required = true) Long id) {
        return chargeRepository.deleteById(id == null ? 0 : id);
    }
}
