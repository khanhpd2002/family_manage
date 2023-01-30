package com.example.btl.entity;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import javax.swing.text.View;
import java.util.List;
import java.util.Set;

@Table(name = "family_register")
@Entity
public class FamilyRegister {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    
	@Id
    @Column(name = "number")
    private Long number;

//    @Column(name = "number_people")
//    private int numberPeople;

    @Column(name = "owner")
    private String owner;

    @Column(name = "province")
    private String province;

    @Column(name = "district")
    private String district;

    @Column(name = "ward")
    private String ward;

    @Column(name = "address")
    private String address;

    @OneToMany(mappedBy = "family", fetch = FetchType.LAZY)
    private Set<People> memberFamily;
    
    @ManyToMany
    @JoinTable(name="charge_manage", joinColumns = @JoinColumn(name = "family_number"), inverseJoinColumns = @JoinColumn(name = "charge_id"))
    private Set<Charge> charges;
    
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }

    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getWard() {
        return ward;
    }

    public void setWard(String ward) {
        this.ward = ward;
    }

//    public int getNumberPeople() {
//        return numberPeople;
//    }
//
//    public void setNumberPeople(int numberPeople) {
//        this.numberPeople = numberPeople;
//    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Set<People> getMemberFamily() {
        return memberFamily;
    }

    public void setMemberFamily(Set<People> memberFamily) {
        this.memberFamily = memberFamily;
    }
    
//    public Set<People> getMembers () {
//        return memberFamily;
//      }
}
