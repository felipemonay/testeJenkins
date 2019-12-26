import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {routing} from './profile-routing.service';
import {CompanyService} from '../../shared/services/company.service';
import {ProfileComponent} from './profile/profile.component';

@NgModule({
    imports:      [
        CommonModule,
        FormsModule,
        routing,
        NgxMaskModule.forRoot()
    ],
    declarations: [
        ProfileComponent
    ],
    providers:    [
        CompanyService
    ]
})

export class ProfileModule {
}
