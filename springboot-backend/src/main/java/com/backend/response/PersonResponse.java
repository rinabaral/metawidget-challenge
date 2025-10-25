package com.backend.response;

import com.backend.entity.Person;

/**
 * Response wrapper for Person API responses
 * Provides structured response format for frontend consumption
 */
public class PersonResponse {
    private String message;
    private Person person;
    private int totalPersons;

    public PersonResponse() {}

    public PersonResponse(String message, Person person, int totalPersons) {
        this.message = message;
        this.person = person;
        this.totalPersons = totalPersons;
    }

    // Getters and setters
    public String getMessage() { 
        return message; 
    }
    
    public void setMessage(String message) { 
        this.message = message; 
    }
    
    public Person getPerson() { 
        return person; 
    }
    
    public void setPerson(Person person) { 
        this.person = person; 
    }
    
    public int getTotalPersons() { 
        return totalPersons; 
    }
    
    public void setTotalPersons(int totalPersons) { 
        this.totalPersons = totalPersons; 
    }
}