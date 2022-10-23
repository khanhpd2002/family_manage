package com.example.btl.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // getter/setter
@AllArgsConstructor //Create account
@NoArgsConstructor //Constructor default

public class Account {
    private String username;
    private String password;
}
