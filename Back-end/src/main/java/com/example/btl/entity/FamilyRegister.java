package com.example.btl.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data // getter/setter
@AllArgsConstructor //Create FamilyRegister
@NoArgsConstructor //Constructor default
@Table (name = "family_register")
@Entity
public class FamilyRegister {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int number;
    private String owner;
    private String province;
    private String district;
    private String ward;
    private String address;
}
