import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Insertion} from '../../models/insertion';
import {ValidateExcelDataService} from '../../services/validate-excel-data.service';
import {Group} from '../../models/group';

@Component({
    selector: 'app-show-modal-excel',
    templateUrl: './show-modal-excel.component.html'
})

export class ShowModalExcelComponent {

    @Input() public show = false;
    @Output() close: EventEmitter<any> = new EventEmitter();

    public excelData: ValidateExcelDataService = null;

    constructor() {
        this.excelData = ValidateExcelDataService.getInstance();
        this.excelData.setPlatform('na');
    }

    public _insertion: Insertion = new Insertion();

    @Input()
    set insertion(insertion: Insertion) {
        this._insertion = insertion;
        const p = null === this._insertion.extra || undefined === this._insertion.extra ? '' : this._insertion.extra.media_adserver_platform;
        this.excelData.setPlatform(p);
    }

    public _group: Group = new Group();

    @Input()
    set group(group: Group) {
        this._group = group;
    }

    onClose() {
        this.close.emit(true);
    }
}
