import {Component, Input, OnInit} from '@angular/core';
import {Extra} from '../../../../../shared/models/extra';
import {Insertion} from '../../../../../shared/models/insertion';
import {ExtraService} from '../extra.service';
import {SuccessHandler} from '../../../../../shared/http/responses/success-handler';
import {ErrorHandler} from '../../../../../shared/http/responses/error-handler';
import {InsertionService} from '../../../insertion.service';
import { InsertionToastService } from '../../../insertion-toast.service';

@Component({
    selector:    'app-digital-extra',
    templateUrl: './digital-extra.component.html'

})

export class DigitalExtraComponent implements OnInit {
    public extra: Extra = new Extra();

    @Input()
    public admin = false;
    public attention = false;
    private canSubmmit = true;

    constructor(private extraService: ExtraService,
                private insertionService: InsertionService,
                private insertionToastService:InsertionToastService) {
    }

    public _insertion: Insertion = new Insertion();

    @Input()
    set insertion(insertion: Insertion) {
        if (insertion.extra) {
            this.extra = insertion.extra;
        } else {
            this.extra.customer = 'SANTANDER';
            insertion.extra = this.extra;
        }

        this._insertion = insertion;
    }

    ngOnInit() {
        // this.accessLevelService.is_accessible(this.access_level.page, this.access_level.action).subscribe((response: boolean) => {
        //     this.admin = response;
        // });
    }


    emitAlert(attention: boolean) {
        this.attention = attention;
    }

    send() {
        if (!this.canSubmmit) {
            return;
        }
        this.insertionService[this.admin ? 'forceUpdate' : 'update'](this._insertion).subscribe(
            data => {
                this.insertionToastService.updateToastr(this._insertion);
                this.updateExtras();
            }, error => {
                this.canSubmmit = true;
                return new ErrorHandler(error).show();
            }
        );
    }


    updateExtras() {
        this.canSubmmit = false;
        this.extraService.createOrUpdate(this._insertion, this.extra, this.admin).subscribe(
            () => {
                this.canSubmmit = true;
                return new SuccessHandler('Alterações realizadas com sucesso.').show();
            },
            error => {
                this.canSubmmit = true;
                return new ErrorHandler(error).show();
            }
        );
    }
}
