import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/models/user';
import {Company} from '../../../shared/models/company';
import {CompanyService} from '../../../shared/services/company.service';
import {SuccessHandler} from '../../../shared/http/responses/success-handler';
import {ErrorHandler} from '../../../shared/http/responses/error-handler';
import {ProfileService} from '../profile.service';
import {AuthService} from '../../auth/auth.service';

declare var require: any;
const CryptoJS = require('crypto-js');

@Component({
    selector:    'app-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
    public user: User = new User();

    public companies: Array<Company> = [];

    public tabs = {
        formProfile:  true,
        formPassword: false
    };
    private canSend = true;

    constructor(private companyService: CompanyService, private profileService: ProfileService, private authService: AuthService) {
    }

    ngOnInit() {
        this.user = this.authService.getAuth();

        this.companyService.all().subscribe(data => {
            this.companies = data;
        });
    }

    send() {
        if (!this.canSend) {
            return;
        }
        this.canSend = false;
        this.profileService.update(this.user).subscribe(data => {
            this.canSend = true;
            return new SuccessHandler('Alterações realizadas com sucesso.').show();
        }, error => {
            this.canSend = true;

            return new ErrorHandler(error).show();
        });
    }

    sendPassword() {
        if (!this.canSend) {
            return;
        }
        this.canSend = false;
        this.profileService.updatePassword(this.user).subscribe(data => {
            this.canSend = true;
            return new SuccessHandler('A senha foi alterada com sucesso.').show();
        }, error => {
            this.canSend = true;

            return new ErrorHandler(error).show();
        });

        this.user.password = null;
        this.user.password_confirmation = null;
    }

    showFormProfile() {
        this.tabs.formProfile = true;
        this.tabs.formPassword = false;
    }

    showFormPassword() {
        this.tabs.formProfile = false;
        this.tabs.formPassword = true;
    }
}
