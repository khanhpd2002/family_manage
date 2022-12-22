package com.example.btl.entity;

import javax.persistence.*;

@Entity
@Table(name = "charge_manage")
public class ChargeManage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


}
