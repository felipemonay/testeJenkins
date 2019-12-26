import {Component, Input, OnInit} from '@angular/core';
import {Insertion} from '../../../../../shared/models/insertion';

@Component({
    selector:    'app-comments-field',
    templateUrl: './comments-field.component.html'
})

export class CommentsFieldComponent implements OnInit {
    public name: string = 'comments';
    public label: string = 'Observação';
    public help: string = 'Campo livre e pode ser utilizado para controle das áreas/agências.';

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
