import {Component} from '@angular/core';
import {ContactService} from '../contact.service';
import {Contact} from '../../../shared/models/contact';
import {ErrorHandler} from '../../../shared/http/responses/error-handler';
import {SuccessHandler} from '../../../shared/http/responses/success-handler';

@Component({
    selector:    'app-contact-create',
    templateUrl: './contact-create.component.html'
})

export class ContactCreateComponent {
    public contact: Contact = new Contact();


    public empty = '';

    private canSend = true;

    constructor(private contactService: ContactService) {
    }

    send() {
        if (!this.canSend) {
            return;
        }
        this.canSend = false;
        return this.contactService.create(this.contact).subscribe(() => {
            new SuccessHandler('Mensagem enviada com sucesso').show().then(() => {
                this.contact = new Contact();
                this.canSend = true;
            });

        }, error => {
            this.canSend = true;
            new ErrorHandler(error).show();
        });
    }
}
