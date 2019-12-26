import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExtraService} from '../../../components/extras/extra.service';
import {Insertion} from '../../../../../shared/models/insertion';
import {InsertionService} from '../../../insertion.service';

@Component({
    selector: 'app-modal-status-creative-line-component',
    templateUrl: './modal-status-creative-line-component.component.html',
    styleUrls: ['./modal-status-creative-line-component.component.scss']
})
export class ModalStatusCreativeLineComponentComponent implements OnInit {


    public _show = false;


    public _insertion = new Insertion();

    @Output()
    public doClose: EventEmitter<any> = new EventEmitter();


    public statusList = [];

    constructor(private insertionService: InsertionService) {
    }

    ngOnInit() {

    }

    @Input()
    set show(show: boolean) {


        this._show = show;

    }


    @Input()
    set insertion(insertion: Insertion) {


        this._insertion = insertion;
        this.insertionService.digitalStatus(this._insertion).subscribe((data: any) => {
            this.statusList = [];
            const result = data.reduce((res, elem) => {

                if (!res[elem.name]) {
                    res[elem.name] = {};
                    this.statusList.push(res[elem.name] );
                    res[elem.name]['name'] = elem.name;
                }
                res[elem.name][elem.status] = elem.count;
                return res;
            }, {});


        });

    }

    close() {
        this.doClose.emit(true);
    }

}
