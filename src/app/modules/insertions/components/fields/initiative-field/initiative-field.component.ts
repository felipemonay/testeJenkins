import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Insertion} from '../../../../../shared/models/insertion';
import {IOption} from 'ng-select';
import {FlagService} from '../../../../../shared/services/flag.service';

@Component({
    selector:    'app-initiative-field',
    templateUrl: './initiative-field.component.html'
})

export class InitiativeFieldComponent implements OnInit {
    @ViewChild('flag', { static: true }) flag: any;
    public flags: Array<IOption> = [];
    public name: string = 'initiative_id';
    public label: string = 'Iniciativa';
    public help: string = 'Informar se campanha está vinculada a uma iniciativa maior do Santander (Ex. Black Week).  Preenchimento não obrigatório, caso não exista essa frente.';

    constructor(private flagService: FlagService) {
    }

    public _insertion: Insertion;

    @Input()
    set insertion(insertion: Insertion) {
        if (insertion.initiative_id && this.flags) {
            this.flag.select(String(insertion.initiative_id));
        }

        this._insertion = insertion;
    }

    ngOnInit() {
        this.flagService.all().subscribe(data => {
            this.flags = this.flagService.toOptions(data);
        });
    }

    onSelect(option: IOption) {
        this._insertion.initiative_id = option.value;
    }

    onDeselected() {
        this._insertion.initiative_id = '';
    }
}
