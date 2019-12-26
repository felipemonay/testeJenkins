import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Insertion} from '../../../../../shared/models/insertion';
import {MediaModuleService} from '../../../../../shared/services/media-module.service';
import {InsertionService} from '../../../insertion.service';

@Component({
    selector:    'app-impact-field',
    templateUrl: './impact-field.component.html'
})

export class ImpactFieldComponent implements OnInit {
    public name = 'impact';
    public label = 'Impacto Planejado (QTD)';
    public help = 'Ainda que o modelo de compra/negociação seja um, quanto estimamos de impacto?  (Ex. Tipo de Compra = CPL e Impacto planejado = views)';


    public model = {
        impact: ''
    };


    constructor(public mediaModuleService: MediaModuleService,
                private insertionService: InsertionService,
                private cdr: ChangeDetectorRef) {
    }

    public _insertion: Insertion;

    @Input()
    set insertion(insertion: Insertion) {
        this._insertion = insertion;
        const i = this._insertion ? this._insertion.impact || '' : '';
        this.model.impact = this.numberWithCommas(i);
        // this.model.impact = this._insertion.impact;
    }

    ngOnInit() {
        this.watch();
    }

    watch() {
        this.insertionService.change.subscribe((field) => {
            // console.log(this._insertion.pi_type_id)
            if (field === 'pi_type_id' || field === 'media' || field === 'impact_type_id') {
                this.cdr.detectChanges();
            }
        });

    }

    onChange() {
        const n = this.model.impact;
        this.model.impact = this.numberWithCommas(n);
        this._insertion.impact = this.number(n);
        this.model.impact = this._insertion.impact.toString();
    }

    numberWithCommas(x) {
        x = x.toString();
        x = x.replace(/[^0-9]/g, '');
        const pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x)) {
            x = x.replace(pattern, '$1.$2');
        }
        return x;
    }

    number(x) {
        x = x.toString();
        return parseFloat(x.replace(/[^0-9]/g, '') + '.00');
    }

}



