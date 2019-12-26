import {Component, Input, OnInit} from '@angular/core';
import {Extra} from '../../../../../shared/models/extra';
import {Insertion} from '../../../../../shared/models/insertion';
import {SuccessHandler} from '../../../../../shared/http/responses/success-handler';
import {ErrorHandler} from '../../../../../shared/http/responses/error-handler';
import {ExtraService} from '../extra.service';
import {InsertionService} from '../../../insertion.service';
import { InsertionToastService } from '../../../insertion-toast.service';

@Component({
    selector:    'app-ooh-extra',
    templateUrl: './ooh-extra.component.html'

})

export class OohExtraComponent implements OnInit {
    public extra: Extra = new Extra();
    private canSubmmit = true;

    @Input()
    private admin: boolean = false;

    constructor(private extraService: ExtraService,
                private insertionService: InsertionService,
                private insertionToastService:InsertionToastService) {
    }

    @Input()
    public _insertion: Insertion = new Insertion();

    @Input()
    set insertion(insertion: Insertion) {
        if (insertion.extra) {
            this.extra = insertion.extra;
        } else {
            insertion.extra = this.extra;
        }

        this._insertion = insertion;
    }

    ngOnInit() {
    }

    send() {
        if (!this.canSubmmit) {
            return;
        }
        this.insertionService[this.admin ? 'forceUpdate' : 'update'](this._insertion).subscribe(
            data => {
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
                this.insertionToastService.updateToastr(this._insertion);
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
