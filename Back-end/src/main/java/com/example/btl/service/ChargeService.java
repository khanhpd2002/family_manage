package com.example.btl.service;

import com.example.btl.entity.Charge;
import com.example.btl.entity.People;
import com.example.btl.repository.ChargeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChargeService {
    @Autowired
    ChargeRepository chargeRepository;

    public Charge update(Long id, Charge source) {
        Optional<Charge> oCharge = Optional.ofNullable(this.chargeRepository.findById(id == null ? 0 : id));

        Charge charge = oCharge.get();
        charge.setName(source.getName());
        charge.setAmount(source.getAmount());
        charge.setChargeType(source.getCharge_type());
//        charge.setUnit(source.getUnit());

        return this.chargeRepository.save(charge);
    }
}
