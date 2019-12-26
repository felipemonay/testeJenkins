import {Component, Input, OnInit} from '@angular/core';
import {Extra} from '../../../../../../../shared/models/extra';
import {Insertion} from '../../../../../../../shared/models/insertion';
import {MediaModuleService} from '../../../../../../../shared/services/media-module.service';

declare var require: any;
const dateFormat = require('dateformat');

@Component({
    selector:    'app-initial-date-field',
    templateUrl: './initial-date-field.component.html'
})

export class InitialDateFieldComponent implements OnInit {
    public status = {
        isNewRecord: false,
        isConfirmed: false
    };
    @Input()
    public insertion: Insertion = new Insertion();
    @Input()
    public field_required = true;
    public name: string = 'initial_date';
    public label: string = 'Data inicial (dd/mm/aaaa)';
    public help: string = '';

    constructor(public mediaModuleService: MediaModuleService) {
    }

    public _extra: Extra;

    @Input()
    set extra(extra: Extra) {
        if (extra.initial_date) {
            extra.initial_date = dateFormat(new Date(extra.initial_date), 'dd/mm/yyyy');
        }

        this._extra = extra;

        this.status.isNewRecord = !this.insertion.id;
        this.status.isConfirmed = !!(this.insertion.confirmation && this.insertion.confirmation.id);

    }

    ngOnInit() {
    }
}
