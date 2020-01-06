import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Insertion} from '../../../../../shared/models/insertion';
import {IOption} from 'ng-select';
import {AreaMediaService} from '../../../../../shared/services/redshift/area-media.service';
import {InsertionService} from '../../../insertion.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-media-field',
    templateUrl: './media-field.component.html'
})

export class MediaFieldComponent implements OnInit {
    @ViewChild('media', { static: true }) media: any;
    public _currentMedia = '';
    public medias: Array<IOption> = [];
    public name: string = 'media';
    public label: string = 'Mídia/Meio';
    public help: string = 'Informar qual a mídia/meio utilizada na campanha. Caso não tenha encontrado a classificação ideal para sua campanha, enviar e-mail para MKT Automation & BI - mktautomationbi@santander.com.br';
    public status = {
        isNewRecord: false,
        isConfirmed: false,
        isDuplicated: false
    };

    constructor(private areaMediaService: AreaMediaService, private insertionService: InsertionService) {
    }

    public _insertion: Insertion = new Insertion();

    @Input()
    set insertion(insertion: Insertion) {
        this._insertion = insertion;
        this._currentMedia = this._insertion.media;
        this.status.isNewRecord = !this._insertion.id;
        this.status.isDuplicated = !!this._insertion.insertion_id;
        this.status.isConfirmed = !!(this._insertion.confirmation && this._insertion.confirmation.id);
        this.getMedias();

    }

    public _checkMediaChange: Boolean = false;

    @Input()
    set checkMediaChange(checkMediaChange: Boolean) {
        this._checkMediaChange = checkMediaChange;
        this.getMedias();
    }

    ngOnInit() {
        this.watch();
    }

    watch() {
        this.insertionService.change.subscribe((field) => {
            if (field === 'area') {
                this.getMedias();
            }
        });

    }

    getMedias() {
        if (this._insertion.area) {
            this.areaMediaService.medias(this._insertion.area).subscribe(data => {
                this.medias = this.areaMediaService.toOptions(data);
                this.media.select(this._insertion.media);
            });
        }
    }

    onSelect(option: IOption) {

        const self = this;

        if (this._checkMediaChange) {
            swal.fire({
                title: 'Alerta!',
                text: 'Confirmar alteração da midia/meio? Todas as informações extras e da linha criativo (Título PI) serão excluídas.',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, continuar!',
                cancelButtonText: 'Não, cancelar!'
            }).then((response: any) => {
                if (!response.dismiss) {
                    this.areaMediaService.change(self._insertion, option.value).subscribe(data => {
                        window.location.reload();
                    });
                } else {
                    self._insertion.media = self._currentMedia;
                    this.media.select(this._insertion.media);
                }
            });
        }

        this._insertion.media = option.value;
        this.insertionService.changing(this.name);
    }


}
