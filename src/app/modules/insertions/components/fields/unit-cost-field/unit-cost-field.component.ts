import {Component, Input, OnInit} from '@angular/core';
import {Insertion} from '../../../../../shared/models/insertion';

@Component({
    selector:    'app-unit-cost-field',
    templateUrl: './unit-cost-field.component.html'
})

export class UnitCostFieldComponent implements OnInit {
    public name: string = 'unit_cost';
    public label: string = 'Custo Unitário  (Modelo de compra)';
    public help: string = 'Custo unitário deve ser referente ao modelo de negociação com esse veículo. Como de fato será pago. Equivalente ao tipo de compra que será mencionado no Excel digital.';

    constructor() {
    }

    public _insertion: Insertion;

    @Input()
    set insertion(insertion: Insertion) {
        this._insertion = insertion;
    }

    ngOnInit() {
    }
}
