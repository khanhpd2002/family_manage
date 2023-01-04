package com.example.btl.entity;

import javax.persistence.*;

import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Data // getter/setter
//@AllArgsConstructor //Create account
//@NoArgsConstructor //Constructor default

@Component
@Entity
@Table(name = "roles")
public class Role { 
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@Column(nullable = false, length = 50, unique = true)
	private String name;

	public Role() { }

	public Role(String name) {
			this.name = name;
	}

	public Role(Integer id) {
			this.id = id;
	}

	@Override
	public String toString() {
		return this.name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
	// getters and setters are not shown for brevity   
}
