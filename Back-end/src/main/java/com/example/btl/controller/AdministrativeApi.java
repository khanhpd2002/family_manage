package com.example.btl.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.btl.entity.Administrative;
import com.example.btl.entity.People;
import com.example.btl.repository.AdministrativeRepository;
import com.example.btl.service.AdministrativeService;

@RestController
@RequestMapping("/administrative")
@PreAuthorize("hasAuthority('admin')")
public class AdministrativeApi {
	@Autowired AdministrativeRepository administrativeRepository;
	@Autowired AdministrativeService administrativeService;
	
	@GetMapping()
	public List<Administrative> findAll() {
        return (List<Administrative>) administrativeRepository.findAll();
    }
	
	@PostMapping()
    public Administrative create(@RequestBody Administrative administrative) {
        return administrativeRepository.saveAndFlush(administrative);
    }
	
	@GetMapping("/{code}")
	public Administrative findBycode(@PathVariable(name = "code", required = true) Long code) {
		Administrative administrative = null;
		Optional<Administrative> opt = administrativeRepository.findByCode(code == null ? 0 : code);
		if (opt.isPresent()) {
			administrative = opt.get();
		}
		return administrative;
    }
	
	@PatchMapping("/{code}")
    public Administrative update(@PathVariable(name = "code", required = true) Long code,
                         @RequestBody Administrative administrative) {
        return administrativeService.update(code, administrative);
    }
}
