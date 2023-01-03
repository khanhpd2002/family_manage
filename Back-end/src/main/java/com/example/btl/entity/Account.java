package com.example.btl.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Data // getter/setter
//@AllArgsConstructor //Create account
//@NoArgsConstructor //Constructor default

public class Account {
	
    private String username;
    private String password;
	public String getUsername() {
		return username;
	}
	public Account(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
    
}
