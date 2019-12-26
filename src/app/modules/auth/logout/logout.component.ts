import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {InsertionFilterService} from '../../insertions/insertion-filter.service';

@Component({
    selector:    'app-logout',
    templateUrl: './logout.component.html'
})

export class LogoutComponent {
    public constructor(private router: Router, private authService: AuthService, private insertionFilterService: InsertionFilterService) {
    }

    public logout() {
        this.authService.logout().subscribe(() => {
            localStorage.removeItem('token');
            this.insertionFilterService.clearAll();
            this.router.navigate(['/auth/login']);
        });
    }
}
