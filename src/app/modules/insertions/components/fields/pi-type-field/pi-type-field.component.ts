import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Insertion} from '../../../../../shared/models/insertion';
import {IOption} from 'ng-select';
import {PiTypeService} from '../../../../../shared/services/pi-type.service';
import {InsertionService} from '../../../insertion.service';

@Component({
    selector: 'app-pi-type-field',
    templateUrl: './pi-type-field.component.html'
})

export class PiTypeFieldComponent implements OnInit {
    @ViewChild('pi_type') pi_type: any;
    public pi_types: Array<IOption> = [];
    public name: string = 'pi_type_id';
    public label: string = 'Tipo de PI';
    public help: string = 'Informar o Tipo de PI (Sistema AD).';

    constructor(private piTypeService: PiTypeService, private cdr: ChangeDetectorRef, private insertionService: InsertionService) {
    }

    public _insertion: Insertion;

    @Input()
    set insertion(insertion: Insertion) {
        if (insertion.pi_type_id && this.pi_types) {
            this.pi_type.select(String(insertion.pi_type_id));
        }

        this._insertion = insertion;
    }

    ngOnInit() {
        this.piTypeService.all().subscribe(data => {
            this.pi_types = this.piTypeService.toOptions(data);
        });

    }


    onSelect(option: IOption) {
        this._insertion.pi_type_id = Number(option.value);
        this.cdr.detectChanges();
        this.insertionService.changing(this.name);
    }
}
