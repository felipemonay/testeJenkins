import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

declare var require: any;
const httpBuildQuery = require('http-build-query');

@Injectable({
  providedIn: 'root'
})
export class FluxoManutencaoService {

  constructor(private http: HttpClient) { }

  download(type: string) {
    const url = `/support/file-download/${type}`;

    return this.http.get(url, { responseType: 'blob' });
  }

  send(formData: FormData) {
    const url = `/support/send-mail`;
    return this.http.post(url, formData);
  }

}
