import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../modules/auth/auth.service';

@Injectable(<any>{
    providedIn: 'root'
})

export class RedirectIfNotAuthenticatedGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let token = localStorage.getItem('token');

        if (!token) {
            this.router.navigate(['/login']);
            return true;
        }

        this.authService.checkAuth(token).subscribe(response => {
            if (!response) {
                localStorage.removeItem('token');
                this.router.navigate(['/auth/logout']);
            }
        });

        return true;
    }
}
