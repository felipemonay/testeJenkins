import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccessLevelGroup} from '../models/access-level-group';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})

export class AccessLevelService {
    public constructor(private http: HttpClient) {
    }

    is_accessible(page: string, action: string = '') {
        let url = '/access-levels/exists?page=' + page + '&action=' + action;
        return this.http.get<boolean>(url);
    }

    all() {
        let url = '/access-levels';
        return this.http.get<Array<AccessLevelGroup>>(url);
    }

    save(user: User) {
        let url = '/access-levels';
        return this.http.post(url, user);
    }
}
