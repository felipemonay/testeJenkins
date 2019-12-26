import { Component, Input, OnInit } from '@angular/core';
import { Insertion } from '../../../../../shared/models/insertion';

@Component({
    selector: 'app-pi-not-rated-field',
    templateUrl: './pi-not-rated-field.component.html'
})

export class PiNotRatedFieldComponent implements OnInit {
    public name: string = 'pi_not_rated';
    public label: string = 'PI não valorado';
    public help: string = 'Essa opção deverá ser marcada, caso a campanha seja veiculada em um ambiente que não é comercializado separadamente. (Ex. Rádio da feira de eventos X)';

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
