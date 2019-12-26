import {Component, Input, OnInit} from '@angular/core';
import {Insertion} from '../../models/insertion';

@Component({
    selector:    'app-show-mrm',
    templateUrl: './show-mrm.component.html'
})

export class ShowMrmComponent implements OnInit {
    @Input()
    public insertion: Insertion = new Insertion();

    constructor() {
    }

    ngOnInit() {
    }
}
