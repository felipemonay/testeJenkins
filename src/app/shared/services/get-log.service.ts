import { Pagination } from '../models/pagination';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var require: any;
let httpBuildQuery = require('http-build-query');

@Injectable({
  providedIn: 'root'
})
export class GetLogService {

  constructor(private http: HttpClient) { }

  paginateHistory(page: number = 1, sort: any, date_start: any, date_end: any, company_id: any, insertion_id: any) {
    const url = '/financial-control/activity-history?page=' + page + '&' + '&' + httpBuildQuery({ sort: sort })
      + '&' + httpBuildQuery({ date_start }) + '&' + httpBuildQuery({ date_end }) + '&' + httpBuildQuery({ company_id })
      + '&' +  httpBuildQuery({ insertion_id });

    return this.http.get<Pagination>(url);
  }

}
