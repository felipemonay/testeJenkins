import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector:    'app-sort-column',
    templateUrl: './sort-column.component.html'
})

export class SortColumnComponent {
    public direction: string = '';

    @Input()
    public column: string;

    @Output()
    public onChange: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    @Input()
    set _clear(clear: string) {
        if (clear !== this.column) {
            this.direction = '';
        }
    }

    change(direction: string = '') {
        this.direction = direction;

        this.onChange.emit({column: this.column, direction: this.direction});
    }
}
