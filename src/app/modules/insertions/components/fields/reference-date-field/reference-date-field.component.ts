import {Component, Input, OnInit} from '@angular/core';
import {Insertion} from '../../../../../shared/models/insertion';

declare var require: any;
const dateFormat = require('dateformat');

@Component({
    selector:    'app-reference-date-field',
    templateUrl: './reference-date-field.component.html'
})

export class ReferenceDateFieldComponent implements OnInit {
    public name: string = 'reference_date';
    public label: string = 'Mês Ano Veiculação';
    public help: string = 'Informar o Mês/Ano de veiculação da campanha (ex. 01/2018). Caso a campanha tenha duração de mais de um mês, uma nova chave de inserção deverá ser criada com os meses seguintes.';

    constructor() {
    }

    public _insertion: Insertion;

    @Input()
    set insertion(insertion: Insertion) {
        if (insertion.reference_date) {
            insertion.reference_date = dateFormat(new Date(insertion.reference_date), 'mm/yyyy');
        }

        this._insertion = insertion;
    }

    ngOnInit() {
    }
}
