package com.example.btl.entity;

public class AuthResponse {
    private String username;
    private String accessToken;
 
    public AuthResponse() { }
     
    public AuthResponse(String username, String accessToken) {
        this.username = username;
        this.accessToken = accessToken;
    }

	public String getusername() {
		return username;
	}

	public void setusername(String username) {
		this.username = username;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
 
    // getters and setters are not shown...
}