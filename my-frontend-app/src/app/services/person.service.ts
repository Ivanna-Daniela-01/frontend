import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Person } from "../models/person"; // Assuming you have a Person model
import { Global } from "./global";
import { Observable } from 'rxjs';

@Injectable()
export class PersonService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = Global.url;
    }

    getPersons(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'persons', { headers: headers });
    }

    savePerson(person: Person): Observable<any> {
        let params = JSON.stringify(person);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'savePerson', params, { headers: headers });
    }

    getPerson(id: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'getPerson/' + id, { headers: headers });
    }

    updatePerson(person: Person): Observable<any> {
        let params = JSON.stringify(person);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'updatePerson/' + person._id, params, { headers: headers });
    }

    deletePerson(id: string): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + 'deletePerson/' + id, { headers: headers });
    }
}
