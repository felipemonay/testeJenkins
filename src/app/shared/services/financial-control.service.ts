import { Pagination } from '../models/pagination';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var require: any;
let httpBuildQuery = require('http-build-query');

@Injectable({
  providedIn: 'root'
})

export class FinancialControlService {

  public constructor(private http: HttpClient) { }


  paginateFinancialSummary(page: number = 1, search: any, sort: any, filter: number) {

    const url = '/media-plan/' + filter + '?page=' + page + '&' + httpBuildQuery({ search: search }) + '&' + httpBuildQuery({ sort: sort });

    return this.http.get<Pagination>(url);
  }

}

