package com.example.btl.entity;

import java.sql.Date;

import javax.persistence.*;

@Entity
@Table(name = "charge_manage")
public class ChargeManage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "charge_id")
    private Integer charge_id;
    
    @Column(name = "family_id")
    private Integer family_id;

	@Column(name = "payer")
    private String payer;
    
    @Column(name = "pay_date")
    private Date pay_date;
    
    @Column(name = "name")
    private String name;

    public ChargeManage(Long id, Integer charge_id, Integer family_id, String payer, Date pay_date, String name) {
		super();
		this.id = id;
		this.charge_id = charge_id;
		this.family_id = family_id;
		this.payer = payer;
		this.pay_date = pay_date;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getCharge_id() {
		return charge_id;
	}

	public void setCharge_id(Integer charge_id) {
		this.charge_id = charge_id;
	}

	public Integer getFamily_id() {
		return family_id;
	}

	public void setFamily_id(Integer family_id) {
		this.family_id = family_id;
	}

	public String getPayer() {
		return payer;
	}

	public void setPayer(String payer) {
		this.payer = payer;
	}

	public Date getPay_date() {
		return pay_date;
	}

	public void setPay_date(Date pay_date) {
		this.pay_date = pay_date;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    
    
}
