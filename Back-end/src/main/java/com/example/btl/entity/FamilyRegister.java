package com.example.btl.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Table;

@Data // getter/setter
@AllArgsConstructor //Create FamilyRegister
@NoArgsConstructor //Constructor default
@Table (name="family-register")

public class FamilyRegister {
    private int id;
    private int number;
    private String owner;
    private String province;
    private String district;
    private String ward;
    private String address;
}
