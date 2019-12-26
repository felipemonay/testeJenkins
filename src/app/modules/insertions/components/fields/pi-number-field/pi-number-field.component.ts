import {Component, Input, OnInit} from '@angular/core';
import {Insertion} from '../../../../../shared/models/insertion';
import {InsertionService} from '../../../insertion.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector:    'app-pi-number-field',
    templateUrl: './pi-number-field.component.html'
})

export class PiNumberFieldComponent implements OnInit {
    public name: string = 'pi_number';
    public label: string = 'Número PI (A.D)';
    public help: string = 'Informar o número da PI (Plano de Inserção no Sistema AD) atrelado ao faturamento dessa campanha.';

    constructor(private insertionService: InsertionService, private toastr: ToastrService) {
    }

    public _insertion: Insertion;

    @Input()
    set insertion(insertion: Insertion) {
        this._insertion = insertion;
    }

    ngOnInit() {
    }

    onChange() {
        if (!this._insertion.pi_number) {
            return;
        }
        this._insertion.pi_number = this._insertion.pi_number
                                        .replace(/[^0-9;]/g, '')
                                        .replace(/[;]+/g, ' ')
                                        .trim()
                                        .replace(/\s+/g, ';');
        this.insertionService.handlesPiNumbers(this._insertion).subscribe(() => {
        }, error => {
            this.toastr.error(Object.values(error.error.errors)[0][0], '', {timeOut: 10000});
        });
    }

}
