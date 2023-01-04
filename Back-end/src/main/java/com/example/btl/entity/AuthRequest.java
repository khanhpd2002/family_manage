package com.example.btl.entity;

//import javax.validation.constraints.username;
import javax.validation.constraints.NotNull;
 
//import org.hibernate.validator.constraints.Length;
 
public class AuthRequest {
    @NotNull 
    private String username;
     
    @NotNull
    private String password;

	public AuthRequest(@NotNull String username, @NotNull String password) {
		super();
		this.username = username;
		this.password = password;
	}

	public String getusername() {
		return username;
	}

	public void setusername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
 
}