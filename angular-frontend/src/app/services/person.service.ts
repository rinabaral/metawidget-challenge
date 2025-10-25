import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Person interface matching the backend entity
 */
export interface Person {
    firstName: string;
    lastName: string;
    age: number;
    address: Address;
    children?: string[];
}

/**
 * Address interface for nested objects
 */
export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

/**
 * API Response interface
 */
export interface PersonResponse {
    message: string;
    person: Person;
    totalPersons: number;
}

/**
 * Person Service for API communication
 * Handles all backend interactions for Person management
 */
@Injectable({
    providedIn: 'root'
})
export class PersonService {
    private apiUrl = 'http://localhost:8080/api/person';
    
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient) {}

    /**
     * Save a person to the backend
     */
    savePerson(person: Person): Observable<PersonResponse> {
        console.log('Sending person data to backend:', person);
        return this.http.post<PersonResponse>(this.apiUrl, person, this.httpOptions);
    }

    /**
     * Get all persons from the backend
     */
    getAllPersons(): Observable<Person[]> {
        return this.http.get<Person[]>(this.apiUrl);
    }

}