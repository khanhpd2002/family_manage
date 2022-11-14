package com.example.btl.entity.enums;

public enum RelationWithOwnerType {
    OWNER("OWNER"), WIFE("WIFE"), SON("SON"), DAUGHTER("DAUGHTER");

    private String value;

    RelationWithOwnerType(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }
}
