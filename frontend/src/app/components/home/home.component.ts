import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css', 
  providers:[  PersonService]
})
export class HomeComponent implements OnInit {
  editModes: { [key: number]: boolean } = {}; // Object to track edit mode for each row

  person: Person[] = [];
  newPerson: Person = {
    id:0,
    name: '',
    lastname: '',
    password: '',
    mail: ''
  };

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    // Fetch the person data when the component initializes
    this.fetchPersons();
  }

  fetchPersons(): void {
    // Call the getPersons method from PersonService to fetch the person data
    this.personService.getPersons().subscribe(
      (persons: Person[]) => {
        this.person = persons;
        console.log('Fetched persons:', this.person);

      },
      (error) => {
        console.error('Error fetching persons:', error);
      }
    );
  }

  
  deletePerson(id: number): void {
   // const personId = parseInt(id, 10);
    // Call the deletePerson method from PersonService to delete the person by ID
    this.personService.deletePerson(id).subscribe(
      () => {
         // Find the deleted person in the array
      const deletedPerson = this.person.find(person => person.id === id);
      if (deletedPerson) {
        // Log the deleted person's info
        console.log(`${deletedPerson.name} ${deletedPerson.lastname} (${deletedPerson.id}) has been deleted`);
      }
      // Remove the deleted person from the array
      this.person = this.person.filter(person => person.id !== id);
      },
      (error) => {
        console.error('Error deleting person:', error);
      }

    );
  }

  toggleEditMode(id: number): void {
    // Toggle the edit mode for the specified row
    this.editModes[id] = !this.editModes[id];
  }

  savePerson(person: Person): void {
    // Implement save logic here
    // Call the updatePerson method from PersonService to save changes
    this.personService.updatePerson(person).subscribe(
      () => {
        console.log('Person updated successfully');
        this.toggleEditMode(person.id); // Exit edit mode after saving
      },
      (error) => {
        console.error('Error updating person:', error);
      }
    );
  }
  
  saveUser(): void {
    if (this.isValidPerson(this.newPerson)) {
      this.personService.savePerson(this.newPerson).subscribe(
        () => {
          console.log('User saved successfully');
          // Reset the newPerson object for next registration
          this.newPerson = {
            id:0,
            name: '',
            lastname: '',
            password: '',
            mail: ''
          };
        },
        (error) => {
          console.error('Error saving user:', error);
        }
      );
    } else {
      console.error('Invalid user data');
    }
  }

  isValidPerson(person: Person): boolean {
    // Implement validation logic here
    // For example, check if required fields are not empty
    return person.name.trim() !== '' &&
           person.lastname.trim() !== '' &&
           person.password.trim() !== '' &&
           person.mail.trim() !== '';
  }
  
}