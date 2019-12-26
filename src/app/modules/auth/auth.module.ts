import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {routing} from './auth-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {CompanyService} from '../../shared/services/company.service';

@NgModule({
    imports:      [
        routing,
        CommonModule,
        FormsModule,
        NgxMaskModule.forRoot()
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent
    ],
    providers:    [
        CompanyService
    ]
})

export class AuthModule {
}
