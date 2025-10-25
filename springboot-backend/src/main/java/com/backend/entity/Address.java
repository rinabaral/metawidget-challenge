package com.backend.entity;

import lombok.*;

@Data
public class Address {
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String country;
}
