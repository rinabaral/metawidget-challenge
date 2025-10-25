import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetawidgetWrapperComponent } from "../metawidget-wrapper/metawidget-wrapper";
import { Person, PersonService, Address } from '../services/person.service';


@Component({
  selector: 'app-person',
  standalone: true,
  imports: [CommonModule, FormsModule, MetawidgetWrapperComponent],
  templateUrl: './person.html',
  styleUrls: ['./person.css']              
})
export class PersonComponent implements OnInit {
  person: Person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 35,
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'USA'
    },
    children: ['Alice', 'Bob']
  };

  // Metawidget configuration for dynamic form generation
  mwConfig = {
    inspector: (toInspect: any) => ({
      properties: {
        firstName: { 
          type: 'string', 
          required: true, 
          title: 'First Name',
          description: 'Enter your first name'
        },
        lastName: { 
          type: 'string', 
          required: true, 
          title: 'Last Name',
          description: 'Enter your last name'
        },
        age: { 
          type: 'number', 
          title: 'Age', 
          minimum: 0,
          maximum: 120,
          description: 'Enter your age'
        },
        address: {
          type: 'object',
          title: 'Address',
          description: 'Your home address'
        },
        children: {
          type: 'array',
          title: 'Children',
          description: 'List of your children\'s names'
        }
      }
    }),
    layout: {
      name: 'table',
      numberOfColumns: 2
    }
  };

  isSaving = false;
  saveMessage = '';
  allPersons: Person[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.loadAllPersons();
  }

  //Saving person data to backend
  onSave() {
    console.log('Saving person:', this.person);
    this.isSaving = true;
    this.saveMessage = '';

    this.personService.savePerson(this.person).subscribe({
      next: (response) => {
        console.log('Person saved successfully:', response);
        this.saveMessage = `✅ ${response.message} (Total persons: ${response.totalPersons})`;
        this.isSaving = false;
        this.loadAllPersons(); // Refresh the list
      },
      error: (error) => {
        console.error('Error saving person:', error);
        this.saveMessage = `❌ Error: ${error.message || 'Failed to save person'}`;
        this.isSaving = false;
      }
    });
  }

  //Loading all the person details
  loadAllPersons() {
    this.personService.getAllPersons().subscribe({
      next: (persons) => {
        this.allPersons = persons;
        console.log('Loaded persons:', persons);
      },
      error: (error) => {
        console.error('Error loading persons:', error);
      }
    });
  }

  // Handling form data changes from Metawidget
  onPersonChange(event: any) {
    console.log('Person data changed:', event);
    // The Metawidget fallback handles data binding automatically
  }

  // Resetting form to default values
  resetForm() {
    this.person = {
      firstName: '',
      lastName: '',
      age: 0,
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      },
      children: []
    };
    this.saveMessage = '';
  }

  // Loading a person from the list for editing
  loadPersonForEdit(person: Person) {
    this.person = { ...person };
    this.saveMessage = '';
  }

 // Getting formatted address string
  getAddressString(address: Address): string {
    if (!address) return 'No address';
    const parts = [address.street, address.city, address.state, address.zipCode, address.country]
      .filter(part => part && part.trim() !== '');
    return parts.join(', ') || 'No address';
  }
}