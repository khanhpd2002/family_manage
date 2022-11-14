package com.example.btl.entity.enums;

public enum ChargeType {
    VOLUNTARY("VOLUNTARY"), MANDATORY("MANDATORY");

    private String value;

    ChargeType(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}
