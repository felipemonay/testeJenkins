import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {User} from '../../../shared/models/user';
import {ErrorHandler} from '../../../shared/http/responses/error-handler';
import {SuccessHandler} from '../../../shared/http/responses/success-handler';

@Component({
    selector:    'app-forgot-password',
    templateUrl: './forgot-password.component.html'
})

export class ForgotPasswordComponent {
    public user: User = new User();

    private canSend = true;

    constructor(private authService: AuthService, private router: Router) {
    }


    send() {
        if (!this.canSend) {
            return;
        }
        this.canSend = false;
        this.authService.forgotPassword(this.user).subscribe(response => {
            this.canSend = true;
            return new SuccessHandler('Dentro de instantes, você receberá um email com instruções de como criar uma nova senha.').show();
        }, error => {
            this.canSend = true;
            return new ErrorHandler(error).show();
        });
    }
}
