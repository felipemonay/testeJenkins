import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pagination} from '../../../shared/models/pagination';
import {User} from '../../../shared/models/user';

@Injectable({
    providedIn: 'root'
})

export class UserTrashService {
    public constructor(private http: HttpClient) {
    }

    find(id: number) {
        const url = '/trash/users/' + id;
        return this.http.get<User>(url);
    }

    paginate(page: number = 1) {
        const url = '/trash/users?page=' + page;

        return this.http.get<Pagination>(url);
    }

}
