import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Extra} from '../../../../../../../shared/models/extra';
import {Insertion} from '../../../../../../../shared/models/insertion';

import {IOption} from 'ng-select';

import {InsertionExtraOptionsService} from '../../../../../../../shared/services/insertion-extra-options.service';
import swal from 'sweetalert2';
import {InsertionService} from '../../../../../insertion.service';
import {SuccessHandler} from '../../../../../../../shared/http/responses/success-handler';
import {ErrorHandler} from '../../../../../../../shared/http/responses/error-handler';
import {Filters} from 'src/app/shared/models/filters';


@Component({
    selector:    'app-media-adserver-platform-field',
    templateUrl: './media-adserver-platform-field.component.html'
})

export class MediaAdserverPlatformFieldComponent implements OnInit {
    @ViewChild('media_adserver_platform', { static: true }) media_adserver_platform: any;
    public status = {
        isNewRecord:  false,
        isConfirmed:  false,
        isDuplicated: false
    };
    public adservers: Array<IOption> = [];
    @Input()
    public insertion: Insertion = new Insertion();
    @Input()
    public admin = false;
    public name = 'media_adserver_platform';
    public label = 'Ad Server / Plataforma';
    public help = 'Ad Server / Plataforma da Mídia';
    public _currentMediaAdserverPlatform = '';
    public filters: Filters = new Filters();

    constructor(private insertionExtraOptionsService: InsertionExtraOptionsService, private insertionService: InsertionService) {
    }

    public _extra: Extra;

    @Input()
    set extra(extra: Extra) {
        this._currentMediaAdserverPlatform = extra.media_adserver_platform;
        this._extra = extra;
        this.getAdservers();
        this.status.isNewRecord = !this.insertion.id;
        this.status.isDuplicated = !!this.insertion.insertion_id;
        this.status.isConfirmed = !!(this.insertion.confirmation && this.insertion.confirmation.id);
    }

    ngOnInit() {

        this.watch();
    }

    watch() {
        this.insertionExtraOptionsService.change.subscribe(() => {
            this._extra.media_adserver_platform = '';
            this.getAdservers();
        });

    }

    getAdservers() {
        if (this._extra.media_owner) {
            this.filters.meio = this.insertion.media.toLowerCase();
            this.filters.veiculo = this._extra.media_owner;

            this.insertionExtraOptionsService.adservers(this.filters, this.insertion.id).subscribe(data => {
                this.adservers = this.insertionExtraOptionsService.toOptions(data);
                this.media_adserver_platform.select(this._extra.media_adserver_platform);
            });

        }


    }

    onSelect(option: IOption) {
        const self = this;
        if (!self._currentMediaAdserverPlatform || !self._extra.insertion_id) {
            self._currentMediaAdserverPlatform = option.value;
            self._extra.media_adserver_platform = option.value;
            this.media_adserver_platform.select(option.value);
            return;
        }
        swal.fire({
            title:             'Alerta!',
            text:              'Confirmar alteração do ' + this.label + '? Todas as informações da área DIGITAL (Planilha) serão excluídas.',
            type:              'warning',
            showCancelButton:  true,
            confirmButtonText: 'Sim, continuar!',
            cancelButtonText:  'Não, cancelar!'
        }).then((response: any) => {
            if (!response.dismiss) {
                this._extra.media_adserver_platform = option.value;
                this._currentMediaAdserverPlatform = option.value;
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
                self._extra.media_adserver_platform = self._currentMediaAdserverPlatform;
                this.media_adserver_platform.select(self._currentMediaAdserverPlatform);
            }
        });
    }
}


