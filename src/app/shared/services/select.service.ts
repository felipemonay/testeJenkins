import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flag } from 'src/app/shared/models/flag';
import { IOption } from 'ng-select';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  public constructor(private http: HttpClient) {
  }

  all() {
    const url = '/flags';
    return this.http.get<Array<Flag>>(url);
  }
  
  toOptions(data: Array<Flag>): Array<IOption> {
    let options: Array<IOption> = [];

    for (let i in data) {
      options.push({
        label: data[i].slug,
        value: String(data[i].id)
      });
    }

    return options;
  }

  

  allCompanies() {
    const url = '/companies';
    return this.http.get<Array<Company>>(url);
  }

  toOptionsCompanies(data: Array<Company>): Array<IOption> {
    let optionsCompanies: Array<IOption> = [];

    for (let i in data) {
      optionsCompanies.push({
        label: data[i].name,
        value: String(data[i].id)
      });
    }

    return optionsCompanies;
  }

}