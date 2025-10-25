package com.backend.controller;

import com.backend.entity.Person;
import com.backend.entity.Address;
import com.backend.response.PersonResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/person")
@CrossOrigin(origins = "*")
public class PersonController {

    private final List<Person> persons = new ArrayList<>();

    @PostMapping
    public ResponseEntity<PersonResponse> savePerson(@RequestBody Person person) {
        try {
            // Log the received data for debugging
            System.out.println("=== Received Person Data ===");
            System.out.println("Name: " + person.getFirstName() + " " + person.getLastName());
            System.out.println("Age: " + person.getAge());
            
            if (person.getAddress() != null) {
                System.out.println("Address: " + person.getAddress().getStreet() + 
                                 ", " + person.getAddress().getCity());
            }
            
            if (person.getChildren() != null && !person.getChildren().isEmpty()) {
                System.out.println("Children: " + String.join(", ", person.getChildren()));
            }
            System.out.println("=============================");

            persons.add(person);
            
            return ResponseEntity.ok(new PersonResponse(
                "Person saved successfully!", 
                person, 
                persons.size()
            ));
            
        } catch (Exception e) {
            System.err.println("Error saving person: " + e.getMessage());
            return ResponseEntity.badRequest()
                .body(new PersonResponse("Error saving person: " + e.getMessage(), null, 0));
        }
    }

    @GetMapping
    public ResponseEntity<List<Person>> getAllPersons() {
        return ResponseEntity.ok(persons);
    }

}
