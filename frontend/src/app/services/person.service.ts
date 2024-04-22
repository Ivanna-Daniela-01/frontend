import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://localhost:3700'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  // Function to save a new person
  savePerson(person: Person): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/savePerson`, person);
  }

  // Function to fetch all persons
  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.apiUrl}/getPerson`);
  }

  // Function to delete a person by ID
  deletePerson(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deletePerson/${id}`);
  }

  // Function to update a person
  updatePerson(person: Person): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updatePerson/${person.id}`, person);
  }

  // Handle Errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return result as Observable<T>;
    };
  }
}
