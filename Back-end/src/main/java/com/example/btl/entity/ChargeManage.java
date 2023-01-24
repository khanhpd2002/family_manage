package com.example.btl.entity;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.*;

@Entity
@Table(name = "charge_manage")
@IdClass(CompositeKey.class)
public class ChargeManage implements Serializable{
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
	@Id
    @Column(name = "charge_id")
    private Long charge_id;
    
	@Id
    @Column(name = "family_number")
    private Long family_number;

	@Column(name = "payer") 
    private String payer;
    
    @Column(name = "pay_date")
    private Date pay_date;
    
    @Column(name = "amount")
    private Integer amount;
    
    public ChargeManage() {
		super();
	}

	public ChargeManage(Long charge_id, Long family_number, String payer, Date pay_date, Integer amount) {
		super();
//		this.id = id;
		this.charge_id = charge_id;
		this.family_number = family_number;
		this.payer = payer;
		this.pay_date = pay_date;
		this.amount = amount;
	}

//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}

	public Long getCharge_id() {
		return charge_id;
	}

	public void setCharge_id(Long charge_id) {
		this.charge_id = charge_id;
	}

	public Long getFamily_number() {
		return family_number;
	}

	public void setFamily_number(Long family_number) {
		this.family_number = family_number;
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

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}
}

class CompositeKey implements Serializable {
    private Long charge_id;
    private Long family_number;
}