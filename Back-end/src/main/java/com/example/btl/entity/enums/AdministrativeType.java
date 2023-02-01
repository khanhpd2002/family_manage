package com.example.btl.entity.enums;

public enum AdministrativeType {
	TEMPORARY("TEMPORARY"), ABSENT("ABSENT");

    private String value;

    AdministrativeType(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}
