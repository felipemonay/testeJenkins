import {Component, Input, OnInit} from '@angular/core';
import {Insertion} from '../../../../../shared/models/insertion';

@Component({
    selector:    'app-investment-field',
    templateUrl: './investment-field.component.html'
})

export class InvestmentFieldComponent implements OnInit {
    public name: string = 'investment';
    public label: string = 'Investimento líquido';
    public help: string = 'Informar o valor líquido da campanha (com desconto). Caso Tipo PI seja reaplicação, bonificação ou pacote, o valor deverá ser diferente do valor líquido informado na PI. (Ex. Em uma campanha de OOH investimos 200 faces e tivemos bonificação de 100 faces. Nesse caso deverá existir uma PI para cada tipo, no caso do PI de bonificação, deverá ser classificada como NÃO FATURÁVEL e o valor líquido investimento informado ser baseado em valores líquidos reais).';

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
