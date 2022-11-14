package com.example.btl.controller;

import com.example.btl.entity.People;
import com.example.btl.repository.PeopleRepository;
import com.example.btl.service.PeopleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/people")
public class PeopleApi {
    @Autowired
    PeopleRepository peopleRepository;

    @Autowired
    PeopleService peopleService;

    @GetMapping()
    public List<People> findAll() {
        return (List<People>) peopleRepository.findAll();
    }

    @GetMapping("/{id}")
    public People findById(@PathVariable(name = "id", required = true) Long id) {
        return peopleRepository.findById(id == null ? 0 : id);
    }

    @PostMapping()
    public People create(@RequestBody People newPeople) {
        return peopleRepository.save(newPeople);
    }

    @PatchMapping("{id}")
    public People update(@PathVariable(name = "id", required = true) Long id,
                         @RequestBody People newPeople) {
        return peopleService.update(id, newPeople);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable(name = "id", required = true) Long id) {
        peopleRepository.deleteById(id == null ? 0 : id);
    }
}
