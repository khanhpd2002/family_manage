package com.example.btl.controller;

import com.example.btl.entity.FamilyRegister;
import com.example.btl.entity.People;
import com.example.btl.repository.PeopleRepository;
import com.example.btl.service.PeopleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/people")
@PreAuthorize("hasAuthority('admin')")
public class PeopleApi {
    @Autowired
    PeopleRepository peopleRepository;

    @Autowired
    PeopleService peopleService;

    @GetMapping()
    public List<People> findAll() {
        return (List<People>) peopleRepository.findAll();
    }

    @GetMapping("/params")
    public List<People> find(@RequestParam(required = false) String name, @RequestParam(required = false) String otherName,
                             @RequestParam(required = false) String birthday, @RequestParam(required = false) String province,
                             @RequestParam(required = false) String district, @RequestParam(required = false) String ward,
                             @RequestParam(required = false) String address, @RequestParam(required = false) String placeOfBirth,
                             @RequestParam(required = false) String ethnic, @RequestParam(required = false) String placeOfJob,
                             @RequestParam(required = false) String identityCard, @RequestParam(required = false) String relationshipWithOwner,
                             @RequestParam(required = false) String note) {
        List<People> pp = new ArrayList<>();
        pp = this.peopleRepository.find(name, otherName, birthday, province, district, ward, address,
                placeOfBirth, ethnic, placeOfJob, identityCard, relationshipWithOwner, note);
        return pp;
    }

    @GetMapping("/family/{family_number}")
    public List<People> findByFamily_number(@PathVariable(name = "family_number", required = true) Long family_number) {
//    	Systemm.out.println(family_number);
        return peopleRepository.findByFamily_number(family_number == null ? 0 : family_number);
    }
    
    @GetMapping("/{id}")
    public People findById(@PathVariable(name = "id", required = true) Long id) {
        return peopleRepository.findById(id == null ? 0 : id);
    }

    @PostMapping()
    public People create(@RequestBody People newPeople) {
//    	System.out.println(newPeople.getfamily_number());
        return peopleRepository.saveAndFlush(newPeople);
    }

    @PatchMapping("/{id}")
    public People update(@PathVariable(name = "id", required = true) Long id,
                         @RequestBody People newPeople) {
    	System.out.println(id);
        return peopleService.update(id, newPeople);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable(name = "id", required = true) Long id) {
        peopleRepository.deleteById(id == null ? 0 : id);
    }
}