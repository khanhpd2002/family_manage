package com.example.btl.entity;


//import com.example.btl.entity.enums.ChargeType;

import javax.persistence.*;

@Entity
@Table(name = "charge")
public class Charge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "amount")
    private String amount;

    @Column(name = "charge_type")
//    @Enumerated(EnumType.STRING)
    private String charge_type;

//    @Column(name = "unit")
//    private String unit; 
 
    public Long getId() {
        return id;
    }

    public void setId(Long id) { 
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getCharge_type() {
        return charge_type;
    }

    public void setCharge_type(String chargeType) {
        this.charge_type = chargeType;
    }

//    public String getUnit() {
//        return unit;
//    }
//
//    public void setUnit(String unit) {
//        this.unit = unit;
//    }
}
