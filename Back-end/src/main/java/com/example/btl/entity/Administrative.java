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
	@Enumerated(EnumType.STRING)
    private AdministrativeType administrativeType;
    
    @Column(name = "register_phone")
    private String register_phone;
    
    @Column(name = "from")
    private String from;
    
    @Column(name = "to")
    private String to;
    
    @Column(name = "reason")
    private String reason;

	public Long getPeople_id() {
		return people_id;
	}

	public void setPeople_id(Long people_id) {
		this.people_id = people_id;
	}

	public AdministrativeType getAdministrativeType() {
		return administrativeType;
	}

	public void setAdministrativeType(AdministrativeType administrativeType) {
		this.administrativeType = administrativeType;
	}

	public Long getCode() {
		return code;
	}

	public void setCode(Long code) {
		this.code = code;
	}

	public String getRegister_phone() {
		return register_phone;
	}

	public void setRegister_phone(String register_phone) {
		this.register_phone = register_phone;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}
}
