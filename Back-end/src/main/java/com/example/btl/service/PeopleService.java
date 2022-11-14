package com.example.btl.service;

import com.example.btl.entity.FamilyRegister;
import com.example.btl.entity.People;
import com.example.btl.repository.PeopleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PeopleService {
    @Autowired
    PeopleRepository peopleRepository;

    public People update(Long id, People source) {
        Optional<People> oPeople = Optional.ofNullable(this.peopleRepository.findById(id == null ? 0 : id));

        People people = oPeople.get();
        people.setName(source.getName());
        people.setOtherName(source.getOtherName());
        people.setBirthday(source.getBirthday());
        people.setProvince(source.getProvince());
        people.setDistrict(source.getDistrict());
        people.setWard(source.getWard());
        people.setPlaceOfBirth(source.getPlaceOfBirth());
        people.setEthnic(source.getEthnic());
        people.setIdentityCard(source.getIdentityCard());
        people.setPlaceOfJob(source.getPlaceOfJob());

        return this.peopleRepository.save(people);
    }
}
