import {Component, Input, OnInit} from '@angular/core';
import {Insertion} from '../../../../../shared/models/insertion';
import {MediaModuleService} from '../../../../../shared/services/media-module.service';

@Component({
    selector:    'app-campaign-name-field',
    templateUrl: './campaign-name-field.component.html'
})

export class CampaignNameFieldComponent implements OnInit {
    public name: string = 'campaign_name';
    public label: string = 'Nome Campanha STS';
    public help: string = 'Informar o nome da campanha em letras maiúsculas, exatamente como estiver no MRM ou briefing da mesma no Santander.';
    public status = {
        isNewRecord:  false,
        isConfirmed:  false,
        isDuplicated: false
    };

    constructor(public mediaModuleService: MediaModuleService) {
    }

    public _insertion: Insertion;

    @Input()
    set insertion(insertion: Insertion) {
        this._insertion = insertion;

        this.status.isNewRecord = !this._insertion.id;
        this.status.isDuplicated = !!this._insertion.insertion_id;
        this.status.isConfirmed = !!(this._insertion.confirmation && this._insertion.confirmation.id);
    }

    ngOnInit() {
    }
}
