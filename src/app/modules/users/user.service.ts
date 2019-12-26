import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../shared/models/user';
import {Pagination} from '../../shared/models/pagination';
import {IOption} from 'ng-select';

declare var require: any;
let httpBuildQuery = require('http-build-query');

@Injectable(<any>{
    providedIn: 'root'
})

export class UserService {
    public constructor(private http: HttpClient) {
    }

    find(id: number) {
        const url = '/users/' + id;
        return this.http.get<User>(url);
    }

    all() {
        const url = '/users/all';

        return this.http.get<Array<User>>(url);
    }

    paginate(page: number = 1, search: any, sort: any) {
        const url = '/users?page=' + page + '&' + httpBuildQuery({search: search}) + '&' + httpBuildQuery({sort: sort});

        return this.http.get<Pagination>(url);
    }

    create(user: User) {
        const url = '/users';

        return this.http.post<User>(url, user);
    }

    update(user: User, send_email: boolean = false) {
        const url = '/users/' + user.id + '?send_email=' + send_email;

        return this.http.put(url, user);
    }

    updatePassword(user: User) {
        const url = '/users/password';

        return this.http.put(url, user);
    }

    destroy(id: number) {
        const url = '/users/' + id;
        return this.http.delete(url);
    }

    toOptions(data: Array<User>): Array<IOption> {
        let options: Array<IOption> = [];

        for (let i in data) {
            options.push({
                label: data[i].name + ' - ' + data[i].company.name,
                value: String(data[i].id)
            });
        }

        return options;
    }
}
