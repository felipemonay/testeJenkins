import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../../../shared/models/pagination';
import { Insertion } from '../../../shared/models/insertion';

declare var require: any;
const httpBuildQuery = require('http-build-query');

@Injectable({
    providedIn: 'root'
})
export class InsertionTrashService {

    public constructor(private http: HttpClient) {
    }

    find(id) {
        let url = '/trash/insertions/' + id;
        return this.http.get<Insertion>(url);
    }

    all(page = 1, search: any) {
        let url = '/trash/insertions?page=' + page + '&' + httpBuildQuery({ search: search });
        return this.http.get<Pagination>(url);
    }
}
