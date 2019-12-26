import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {User} from '../../../shared/models/user';
import {ErrorHandler} from '../../../shared/http/responses/error-handler';

@Component({
    selector:    'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    public user: User = new User();
    @ViewChild('password') passwordElement: ElementRef;
    private canSend = true;

    constructor(private authService: AuthService, private router: Router) {
    }

    send() {
        if (!this.canSend) {
            return;
        }
        this.canSend = false;
        this.authService.login(this.user).subscribe((response: any) => {
            this.canSend = true;
            if (!response) {
                return new ErrorHandler().show('Usuário não encontrado ou cadastro pendente de ativação.');
            }
            localStorage.setItem ('userType', response.company_id);
            // console.log(response);
            this.authService.setAuth(response);
            this.router.navigate(['/']);
        }, error => {
            this.canSend = true;
            return new ErrorHandler(error).show();
        });
    }

    sendOnEnter(event: any) {
        if (event.keyCode === 13) {
            this.send();
        }
    }

    nextOnEnter(event: any) {
        if (event.keyCode === 13 && !this.user.password) {
            return this.passwordElement.nativeElement.focus();
        }

        return this.sendOnEnter(event);
    }
}
