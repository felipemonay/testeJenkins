import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InsertionService} from '../insertion.service';
import {Insertion} from '../../../shared/models/insertion';
import {ErrorHandler} from '../../../shared/http/responses/error-handler';
import {SuccessHandler} from '../../../shared/http/responses/success-handler';
import swal from 'sweetalert2';
import {AccessLevelService} from '../../../shared/services/access-level.service';
import {DownloadService} from '../../../shared/services/download.service';
import {SharedMethodsService} from 'src/app/shared/services/shared-methods.service';
import {MediaModuleService} from '../../../shared/services/media-module.service';

@Component({
    selector:    'app-insertion-show',
    templateUrl: './insertion-show.component.html'
})

export class InsertionShowComponent implements OnInit {
    public insertion: Insertion = new Insertion();

    private canSubmit = true;

    idBloqueio: number;

    constructor(private activatedRoute: ActivatedRoute,
                private insertionService: InsertionService,
                private router: Router,
                private accessLevelService: AccessLevelService,
                private downloadService: DownloadService,
                private sharedMethods: SharedMethodsService,
                public mediaModuleService: MediaModuleService) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            if (typeof params['id'] !== 'undefined') {
                return this.getInsertion(params['id']);
            }

            return this.router.navigate(['/error/404']);
        });

        this.insertionService.getIdBloqueio().subscribe((data: number) => {
            this.idBloqueio = data;
        });
    }

    getInsertion(id) {
        this.insertionService.find(id).subscribe((insertion: Insertion) => {
            this.insertion = insertion;

        }, error => {
            if (error.status === 404) {
                return this.router.navigate(['/error/404']);
            }

            return new ErrorHandler(error).show();
        });
    }

    update(insertion: Insertion) {
        // tslint:disable-next-line:max-line-length
        if ((1 === insertion.version && this.mediaModuleService.isEqual(insertion.media, 'DIGITAL')  ) ||
            (1 === insertion.version && insertion.media === 'PERFORMANCE'  ) ||
            (1 === insertion.version && insertion.media === 'MERCHANDISING'  ) ) { // && this.mediaModuleService.isEqual(insertion.media, 'x_DIGITAL')) {
            this.sharedMethods.openErrorMessage('old-version');
        } else {
            this.accessLevelService.is_accessible('insertions', 'App\\Http\\Controllers\\Api\\InsertionController@forceUpdate')
                .subscribe((data: boolean) => {
                    if (data) {
                        return this.router.navigate(['/insertions/force-update'], {queryParams: {id: insertion.id}});
                    } else {
                        return this.router.navigate(['/insertions/update'], {queryParams: {id: insertion.id}});
                    }
                });
        }
    }


    confirm(insertion: Insertion) {
        if (!this.canSubmit) {
            return;
        }
        this.canSubmit = false;
        let self = this;

        swal.fire({
            title:             'Alerta!',
            text:              'Confirmar exclusão da chave de inserção: ' + insertion.campaign_name + ' (' + insertion.id + ')?',
            type:              'warning',
            showCancelButton:  true,
            confirmButtonText: 'Sim, continuar!',
            cancelButtonText:  'Não, cancelar!'
        }).then((response: any) => {
            this.canSubmit = true;
            if (!response.dismiss) {
                self.destroy(insertion);
            }
        });
    }

    destroy(insertion: Insertion) {
        this.insertionService.destroy(insertion).subscribe(response => {
            this.canSubmit = true;
            return new SuccessHandler('Chave de inserção excluída com sucesso.').show().then(() => {
                this.router.navigate(['/insertions']);
            });
        }, error => {
            this.canSubmit = true;
            return new ErrorHandler(error).show();
        });
    }

    confirmDuplicate(insertion: Insertion) {
        if (( insertion.id <= this.idBloqueio && this.mediaModuleService.isEqual(insertion.media, 'DIGITAL')) ) { 
            this.sharedMethods.openErrorMessage('old-version');
        } else {
            if (!this.canSubmit) {
                return;
            }
            this.canSubmit = false;
            const self = this;

            swal.fire({
                title:             'Alerta!',
                text:              'Confirmar duplicação desta inserção: ' + insertion.campaign_name + ' (' + insertion.id + ')?',
                type:              'warning',
                showCancelButton:  true,
                confirmButtonText: 'Sim, continuar!',
                cancelButtonText:  'Não, cancelar!'
            }).then((response: any) => {
                this.canSubmit = true;
                if (!response.dismiss) {
                    self.duplicate(insertion);
                }
            });
        }
    }

    duplicate(insertion: Insertion) {
        this.insertionService.duplicate(insertion).subscribe((response: any) => {
            if (!response.error) {
                this.canSubmit = true;
                this.accessLevelService.is_accessible('insertions', 'App\\Http\\Controllers\\Api\\InsertionController@forceUpdate')
                    .subscribe((data: boolean) => {
                        if (data) {
                            return this.router.navigate(['/insertions/force-update'], {queryParams: {id: response.id}});
                        } else {
                            return this.router.navigate(['/insertions/update'], {queryParams: {id: response.id}});
                        }
                    });
            } else {
                this.canSubmit = true;
                return new ErrorHandler().show(response.error);
            }
        }, error => {
            this.canSubmit = true;
            return new ErrorHandler(error).show();
        });
    }
}
