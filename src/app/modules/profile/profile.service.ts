import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../shared/models/user';

@Injectable(<any>{
    providedIn: 'root'
})

export class ProfileService {
    public constructor(private http: HttpClient) {
    }

    find() {
        const url = '/profiles';
        return this.http.get<User>(url);
    }

    update(user: User) {
        const url = '/profiles/' + user.id;

        return this.http.put(url, user);
    }

    updatePassword(user: User) {
        const url = '/profiles/password';

        return this.http.put(url, user);
    }

    destroy(user: User) {
        const url = '/profiles/' + user.id;
        return this.http.delete(url);
    }
}
