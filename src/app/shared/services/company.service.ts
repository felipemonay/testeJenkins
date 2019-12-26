import {Injectable} from '@angular/core';
import {Company} from '../models/company';
import {HttpClient} from '@angular/common/http';

@Injectable(<any>{
    providedIn: 'root'
})

export class CompanyService {
    public constructor(private http: HttpClient) {
    }

    public all() {
        const url = '/companies';
        return this.http.get<Array<Company>>(url);
    }
}
