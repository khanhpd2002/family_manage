package com.example.btl.entity;

import java.sql.Date;

import javax.persistence.*;

import com.example.btl.entity.enums.AdministrativeType;

@Entity
@Table(name="administrative")
public class Administrative {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "people_id")
    private Long people_id;
    
    @Column(name = "type")
    private AdministrativeType administrativeType;
    
    @Column(name = "paper_code")
    private String paper_code;
    
    @Column(name = "register_phone")
    private Long register_phone;
    
    @Column(name = "from")
    private Date from;
    
    @Column(name = "to")
    private Date to;
    
    @Column(name = "reason")
    private String reason;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public String getPaper_code() {
		return paper_code;
	}

	public void setPaper_code(String paper_code) {
		this.paper_code = paper_code;
	}

	public Long getRegister_phone() {
		return register_phone;
	}

	public void setRegister_phone(Long register_phone) {
		this.register_phone = register_phone;
	}

	public Date getFrom() {
		return from;
	}

	public void setFrom(Date from) {
		this.from = from;
	}

	public Date getTo() {
		return to;
	}

	public void setTo(Date to) {
		this.to = to;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}
}
