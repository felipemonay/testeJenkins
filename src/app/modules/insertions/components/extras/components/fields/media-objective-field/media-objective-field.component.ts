import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Extra} from '../../../../../../../shared/models/extra';
import {Insertion} from '../../../../../../../shared/models/insertion';

import {IOption} from 'ng-select';

import {InsertionExtraOptionsService} from '../../../../../../../shared/services/insertion-extra-options.service';


@Component({
    selector:    'app-media-objective-field',
    templateUrl: './media-objective-field.component.html'
})

export class MediaObjectiveFieldComponent implements OnInit {
    @ViewChild('media_objective') media_objective: any;
    public objectives: Array<IOption> = [];
    @Input()
    public insertion: Insertion = new Insertion();
    public status = {
        isNewRecord: false,
        isConfirmed: false
    };
    public name = 'media_objective';
    public label = 'Objetivo';
    public help = 'Objetivo';

    constructor(private insertionExtraOptionsService: InsertionExtraOptionsService) {
    }

    public _extra: Extra;

    @Input()
    set extra(extra: Extra) {
        if (extra.media_objective && this.objectives) {
            this.media_objective.select(String(extra.media_objective));
        }

        this._extra = extra;

        this.status.isNewRecord = !this.insertion.id;
        this.status.isConfirmed = !!(this.insertion.confirmation && this.insertion.confirmation.id);

    }

    ngOnInit() {
        this.insertionExtraOptionsService.objectives().subscribe(data => {

            this.objectives = this.insertionExtraOptionsService.toOptions(data);
        });
    }

    onSelect(option: IOption) {
        this._extra.media_objective = option.value;
    }
}
