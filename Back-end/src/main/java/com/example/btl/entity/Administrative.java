package com.example.btl.entity;

import java.sql.Date;

import javax.persistence.*;

import com.example.btl.entity.enums.AdministrativeType;

@Entity
@Table(name="administrative")
public class Administrative {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "code")
    private Long code;

    @Column(name = "people_id")
    private Long people_id;
    
    @Column(name = "type")
    private AdministrativeType type;
    
    @Column(name = "register_phone")
    private Long register_phone;
    
    @Column(name = "dateFrom")
    private String dateFrom;
    
    @Column(name = "dateTo")
    private String dateTo;
    
    @Column(name = "reason")
    private String reason;

	public Long getPeople_id() {
		return people_id;
	}

	public void setPeople_id(Long people_id) {
		this.people_id = people_id;
	}

	public AdministrativeType getType() {
		return type;
	}

	public void setType(AdministrativeType administrativeType) {
		this.type = administrativeType;
	}

	public Long getCode() {
		return code;
	}

	public void setCode(Long code) {
		this.code = code;
	}

	public Long getRegister_phone() {
		return register_phone;
	}

	public void setRegister_phone(Long register_phone) {
		this.register_phone = register_phone;
	}

	public String getDateFrom() {
		return dateFrom;
	}

	public void setDateFrom(String dateFrom) {
		this.dateFrom = dateFrom;
	}

	public String getDateTo() {
		return dateTo;
	}

	public void setDateTo(String dateTo) {
		this.dateTo = dateTo;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}
}
