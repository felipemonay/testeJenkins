import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {routing} from './contact-routing.module';
import {ContactCreateComponent} from './contact-create/contact-create.component';

@NgModule({
    imports:      [
        routing,
        CommonModule,
        FormsModule
    ],
    declarations: [
        ContactCreateComponent
    ]
})

export class ContactModule {
}
