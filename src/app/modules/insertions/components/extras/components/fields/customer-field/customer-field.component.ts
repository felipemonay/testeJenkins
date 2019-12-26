import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {InsertionExtraOptionsService} from 'src/app/shared/services/insertion-extra-options.service';
import {Insertion} from 'src/app/shared/models/insertion';
import {IOption} from 'ng-select';
import {Extra} from 'src/app/shared/models/extra';

@Component({
    selector:    'app-customer-field',
    templateUrl: './customer-field.component.html'
})
export class CustomerFieldComponent implements OnInit {

    @ViewChild('customer') customer: any;
    public customers: Array<IOption> = [];
    public status = {
        isNewRecord:  false,
        isConfirmed:  false,
        isDuplicated: false
    };
    public name = 'customer';
    public label = 'Cliente';
    public help = 'Cliente';

    constructor(private insertionExtraOptionsService: InsertionExtraOptionsService) {
    }

    public _insertion: Insertion = new Insertion();

    @Input()
    set insertion(insertion: Insertion) {
        if (insertion) {
            this._insertion = insertion;
        }
        this.status.isNewRecord = !this._insertion.id;
        this.status.isDuplicated = !!this._insertion.insertion_id;
        this.status.isConfirmed = !!(this._insertion.confirmation && this._insertion.confirmation.id);
    }

    public _extra: Extra;

    @Input()
    set extra(extra: Extra) {
        if (extra.customer && this.customers) {
            this.customer.select(String(extra.customer));
        }

        this._extra = extra;


    }

    ngOnInit() {
        this.insertionExtraOptionsService.customers().subscribe(data => {
            this.customers = this.insertionExtraOptionsService.toOptions(data);
        });
    }

    onSelect(option: IOption) {
        this._extra.customer = option.value;
    }
}
