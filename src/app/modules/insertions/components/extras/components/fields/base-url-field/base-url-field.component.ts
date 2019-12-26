import {Component, Input, OnInit} from '@angular/core';
import {Extra} from '../../../../../../../shared/models/extra';
import {Insertion} from '../../../../../../../shared/models/insertion';


@Component({
    selector:    'app-base-url-field',
    templateUrl: './base-url-field.component.html'
})

export class BaseUrlFieldComponent implements OnInit {

    public status = {
        isNewRecord: false,
        isConfirmed: false
    };
    @Input()
    public insertion: Insertion = new Insertion();
    @Input()
    public field_required = true;
    public name = 'base_url';
    public label = 'URL Base';
    public help = 'URL Base';

    constructor() {
    }

    public _extra: Extra;

    @Input()
    set extra(extra: Extra) {
        this._extra = extra;

        this.status.isNewRecord = !this.insertion.id;
        this.status.isConfirmed = !!(this.insertion.confirmation && this.insertion.confirmation.id);
    }

    ngOnInit() {
    }


}
