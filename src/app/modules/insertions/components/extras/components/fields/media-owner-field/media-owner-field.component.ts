import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Extra} from '../../../../../../../shared/models/extra';
import {Insertion} from '../../../../../../../shared/models/insertion';

import {IOption} from 'ng-select';

import {InsertionExtraOptionsService} from '../../../../../../../shared/services/insertion-extra-options.service';
import {Filters} from 'src/app/shared/models/filters';
import {InsertionExtraOption} from 'src/app/shared/models/insertion-extra-option';

import {SuccessHandler} from '../../../../../../../shared/http/responses/success-handler';
import {ErrorHandler} from '../../../../../../../shared/http/responses/error-handler';
import {InsertionService} from '../../../../../insertion.service';
import swal from 'sweetalert2';


@Component({
    selector:    'app-media-owner-field',
    templateUrl: './media-owner-field.component.html'
})

export class MediaOwnerFieldComponent implements OnInit {
    @ViewChild('media_owner') media_owner: any;
    public owners: Array<IOption> = [];
    insertionExtraOption: InsertionExtraOption[];
    @Input()
    public insertion: Insertion = null;
    public status = {
        isNewRecord:  false,
        isConfirmed:  false,
        isDuplicated: false
    };
    public name = 'media_owner';
    public label = 'Veículo';
    public help = 'Veículo da Mídia';
    filters: Filters = new Filters();

    public _currentMediaOwner = null;
    @Input()
    public admin = false;


    constructor(private insertionExtraOptionsService: InsertionExtraOptionsService, private insertionService: InsertionService) {
    }

    public _extra: Extra;

    @Input()
    set extra(extra: Extra) {
        this._extra = extra;
        this._currentMediaOwner = extra.media_owner;
        this.getMediaOwner();

        this.status.isNewRecord = !this.insertion.id;
        this.status.isDuplicated = !!this.insertion.insertion_id;
        this.status.isConfirmed = !!(this.insertion.confirmation && this.insertion.confirmation.id);
    }

    ngOnInit() {
    }

    getMediaOwner() {
        this.filters.meio = this.insertion.media.toLowerCase();
        this.insertionExtraOptionsService.owners(this.filters, this.insertion.id).subscribe(data => {
            this.insertionExtraOption = data;
            this.owners = this.insertionExtraOptionsService.toOptions(this.insertionExtraOption);
            this.media_owner.select(this._extra.media_owner);
        });


    }

    onSelect(option: IOption) {
        const self = this;
        if (!self._currentMediaOwner || !this._extra.insertion_id) {
            self._currentMediaOwner = option.value;
            self._extra.media_owner = option.value;
            this.media_owner.select(option.value);
            this.insertionExtraOptionsService.changing();
            return;
        }
        swal.fire({
            title:             'Alerta!',
            text:              'Confirmar alteração do ' + this.label + '? Todas as informações da área DIGITAL (Planilha) e Ad Server serão excluídas.',
            type:              'warning',
            showCancelButton:  true,
            confirmButtonText: 'Sim, continuar!',
            cancelButtonText:  'Não, cancelar!'
        }).then((response: any) => {
            if (!response.dismiss) {
                this._extra.media_owner = option.value;
                this._extra.media_adserver_platform = '';
                this._currentMediaOwner = '';
                this.insertionService[this.admin ? 'forceClearDigital' : 'clearDigital'](this.insertion).subscribe((res: any) => {
                    if (!res.error) {
                        return new SuccessHandler('As informações da área DIGITAL (Planilha) foram excluídas com sucesso.').show().then(
                            function () {
                                window.location.reload();
                            }
                        );
                    } else {
                        return new ErrorHandler().show(res.error);
                    }
                }, error => {
                    return new ErrorHandler(error).show();
                });
            } else {
                self._extra.media_owner = self._currentMediaOwner;
                this.media_owner.select(self._currentMediaOwner);
            }
        });


    }
}
