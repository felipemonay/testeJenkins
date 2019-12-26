import { MediaPlan } from './../../shared/models/mediaPlan';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pagination } from 'src/app/shared/models/pagination';

declare var require: any;
let httpBuildQuery = require('http-build-query');

@Injectable({
  providedIn: 'root'
})
export class MediaPlanService {

  public constructor(private http: HttpClient) { }

  paginate(page: number = 1, search: any, sort: any, filter: number) {
    
    const url = '/media-plan/'+filter+'?page=' + page + '&' + httpBuildQuery({ search: search }) + '&' + httpBuildQuery({ sort: sort });

    return this.http.get<Pagination>(url);
  }
}
