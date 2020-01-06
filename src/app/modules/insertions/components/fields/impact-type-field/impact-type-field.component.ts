import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Insertion} from '../../../../../shared/models/insertion';
import {IOption} from 'ng-select';
import {ImpactTypesService} from 'src/app/shared/services/impact_types.service';
import {MediaModuleService} from '../../../../../shared/services/media-module.service';
import {InsertionService} from '../../../insertion.service';

@Component({
    selector: 'app-impact-type-field',
    templateUrl: './impact-type-field.component.html'
})

export class ImpactTypeFieldComponent implements OnInit {
    @ViewChild('impact_type', { static: true }) impact_type: any;
    public impactTypes: Array<IOption> = [];
    public name = 'impact_type_id';
    public label = 'Tipo Impacto';
    public help = 'Impacto planejado para essa ação, refere-se a estratégia.';
    public status = {
        isNewRecord: false,
        isConfirmed: false,
        isDuplicated: false
    };

    constructor(private impactTypesService: ImpactTypesService,
                public mediaModuleService: MediaModuleService,
                private insertionService: InsertionService,
                private cdr: ChangeDetectorRef) {
    }

    public _insertion: Insertion;

    @Input()
    set insertion(insertion: Insertion) {
        if (insertion.impact_type_id && this.impactTypes) {
            this.impact_type.select(String(insertion.impact_type_id));
        }

        this._insertion = insertion;
        this.status.isNewRecord = !this._insertion.id;
        this.status.isDuplicated = !!this._insertion.insertion_id;
        this.status.isConfirmed = !!(this._insertion.confirmation && this._insertion.confirmation.id);
    }

    ngOnInit() {
        this.impactTypesService.all().subscribe(data => {
            this.impactTypes = this.impactTypesService.toOptions(data);
        });
        this.watch();
    }

    watch() {
        this.insertionService.change.subscribe((field) => {
            // console.log(this._insertion.pi_type_id)
            if (field === 'pi_type_id' || field === 'media') {
                this.cdr.detectChanges();
            }
        });

    }


    onSelect(option: IOption) {

        this._insertion.impact_type_id = Number(option.value);
        this.insertionService.changing(this.name);
    }

    onDeselected() {
        this._insertion.impact_type_id = null;
        this.insertionService.changing(this.name);
    }
}
