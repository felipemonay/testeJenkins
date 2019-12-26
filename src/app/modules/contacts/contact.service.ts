import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Contact} from '../../shared/models/contact';

@Injectable(<any>{
    providedIn: 'root'
})

export class ContactService {
    public constructor(private http: HttpClient) {
    }

    create(contact: Contact) {
        let url = '/contacts';

        return this.http.post(url, contact);
    }
}
