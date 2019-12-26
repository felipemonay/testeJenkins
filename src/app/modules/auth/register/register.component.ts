import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {Company} from '../../../shared/models/company';
import {User} from '../../../shared/models/user';
import {CompanyService} from '../../../shared/services/company.service';
import {ErrorHandler} from '../../../shared/http/responses/error-handler';
import {SuccessHandler} from '../../../shared/http/responses/success-handler';

@Component({
    selector:    'app-register',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
    public user: User = new User();

    public companies: Array<Company> = [];


    private canSend = true;

    constructor(private authService: AuthService, private companyService: CompanyService, private router: Router) {
    }

    ngOnInit() {
        this.companyService.all().subscribe(data => {
            this.companies = data;
        });
    }

    send() {
        if (!this.canSend) {
            return;
        }
        this.canSend = false;
        this.authService.register(this.user).subscribe(response => {
            new SuccessHandler('Seu cadastro está em fase de análise pelos administradores do Santander, aguarde o email de liberação para realizar o primeiro login.').show().then(() => {
                this.router.navigate(['/auth/login']);
            });
            this.canSend = true;
        }, error => {
            this.canSend = true;
            return new ErrorHandler(error).show();
        });
    }
}
