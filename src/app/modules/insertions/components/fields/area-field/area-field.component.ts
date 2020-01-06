import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Insertion} from '../../../../../shared/models/insertion';
import {IOption} from 'ng-select';
import {AreaMediaService} from '../../../../../shared/services/redshift/area-media.service';
import {InsertionService} from '../../../insertion.service';
import swal from 'sweetalert2';

@Component({
    selector:    'app-area-field',
    templateUrl: './area-field.component.html'
})

export class AreaFieldComponent implements OnInit {
    @ViewChild('area', { static: true }) area: any;
    public _currentArea = '';
    public areas: Array<IOption> = [];
    public name: string = 'area';
    public label: string = 'Área / Mesa';
    public help: string = 'Informar a área/mesa Santander que realizou o planejamento/briefing da Campanha.';
    public status = {
        isNewRecord:  false,
        isConfirmed:  false,
        isDuplicated: false
    };

    constructor(private areaMediaService: AreaMediaService, private insertionService: InsertionService) {
    }

    public _checkAreaChange: Boolean = false;

    @Input()
    set checkAreaChange(checkMediaChange: Boolean) {
        this._checkAreaChange = checkMediaChange;

    }

    public _insertion: Insertion;

    @Input()
    set insertion(insertion: Insertion) {
        if (insertion.area) {
            this.area.select(insertion.area);
        }


        this._insertion = insertion;
        this._currentArea = this._insertion.area;
        this.status.isNewRecord = !this._insertion.id;
        this.status.isDuplicated = !!this._insertion.insertion_id;
        this.status.isConfirmed = !!(this._insertion.confirmation && this._insertion.confirmation.id);
    }

    ngOnInit() {
        this.areaMediaService.areas().subscribe(data => {
            this.areas = this.areaMediaService.toOptions(data);
        });
    }

    onSelect(option: IOption) {
        this._insertion.area = option.value;

        const self = this;

        if (this._checkAreaChange) {
            swal.fire({
                title:             'Alerta!',
                text:              'Confirmar alteração da Área/Mesa? Todas as informações extras e da linha criativo (Título PI) serão excluídas.',
                type:              'warning',
                showCancelButton:  true,
                confirmButtonText: 'Sim, continuar!',
                cancelButtonText:  'Não, cancelar!'
            }).then((response: any) => {
                if (!response.dismiss) {
                    this.areaMediaService.changeArea(self._insertion, option.value).subscribe(data => {
                        window.location.reload();
                    });
                } else {
                    self._insertion.area = self._currentArea;
                    this.area.select(this._insertion.area);
                }
            });
        } else {
            this._insertion.media = null;
            this._insertion.area = option.value;
            this.insertionService.changing(this.name);
        }


    }
}
