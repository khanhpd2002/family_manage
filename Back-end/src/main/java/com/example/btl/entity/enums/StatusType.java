package com.example.btl.entity.enums;

public enum StatusType {
	    PERMANENT("PERMANENT"), TEMPORARY("TEMPORARY"), ABSENT("ABSENT"), DIED("DIED");

	    private String value;

	    StatusType(String value) {
	        this.value = value;
	    }

	    public String getValue() {
	        return this.value;
	    }
}
