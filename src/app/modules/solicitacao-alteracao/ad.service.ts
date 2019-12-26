import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor(private http: HttpClient) { }

  public getAd(piNumber: number) {
    const url = `/fix-ad/get-pi/${piNumber}`
    return this.http.get<Array<any>>(url);
  }

  public storeAd(ad:Object) {
    const url = '/fix-ad/store';
    return this.http.post(url, ad);
  }

}
