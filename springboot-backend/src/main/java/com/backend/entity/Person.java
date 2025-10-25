package com.backend.entity;

import lombok.*;

import java.util.List;

@Data
public class Person {
    private String firstName;
    private String lastName;
    private int age;
    private Address address;
    private List<String> children;

}
