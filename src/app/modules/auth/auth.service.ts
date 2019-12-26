import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../shared/models/user';
import {environment} from '../../../environments/environment';

declare var require: any;
const CryptoJS = require('crypto-js');

@Injectable(<any>{
    providedIn: 'root'
})

export class AuthService {
    public constructor(private http: HttpClient) {
    }

    setAuth(user: User) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', CryptoJS.AES.encrypt(JSON.stringify(user), environment.SECRET_KEY));
    }

    getAuth(): User {
        const bytes = CryptoJS.AES.decrypt(localStorage.getItem('user').toString(), environment.SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    login(user) {
        const url = '/auth/login';

        return this.http.post<User>(url, user);
    }

    logout() {
        const url = '/auth/logout';

        return this.http.get(url);
    }

    register(user) {
        const url = '/auth/register';

        return this.http.post(url, user);
    }

    forgotPassword(user) {
        const url = '/auth/forgot-password';

        return this.http.post(url, user);
    }

    // recoverPassword(user) {
    //   const url = '/auth/recover-password';
    //
    //   return this.http.post(url, user).subscribe(
    //     response => {
    //       this.router.navigate(['/auth/login']);
    //     },
    //     error => {
    //       alert(Object.values(error.error.errors)[0][0]);
    //     });
    // }

    checkAuth(token) {
        const url = '/auth/check-auth?token=' + token;

        return this.http.get<User | boolean>(url);
    }
}
