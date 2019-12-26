import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { InsertionService } from '../insertion.service';
import { InsertionFilterService } from '../insertion-filter.service';
import { Insertion } from '../../../shared/models/insertion';
import { Pagination } from '../../../shared/models/pagination';
import { ErrorHandler } from '../../../shared/http/responses/error-handler';
import { SuccessHandler } from '../../../shared/http/responses/success-handler';
import { IOption } from 'ng-select';
import { CoreService } from '../../../core/core.service';
import { PiTypeService } from '../../../shared/services/pi-type.service';
import { ImpactTypesService } from '../../../shared/services/impact_types.service';
import { PiType } from '../../../shared/models/pi-type';
import { ImpactType } from '../../../shared/models/impact-type';
import { Company } from '../../../shared/models/company';
import { CompanyService } from '../../../shared/services/company.service';
import { FlagService } from '../../../shared/services/flag.service';
import { Flag } from '../../../shared/models/flag';
import swal from 'sweetalert2';
import { AccessLevelService } from '../../../shared/services/access-level.service';
import { DownloadService } from '../../../shared/services/download.service';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';
import { AlertService } from '../../../core/alert.service';
import { MediaModuleService } from '../../../shared/services/media-module.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-insertion-list',
    templateUrl: './insertion-list.component.html',
    styleUrls: ['./insertion-list.component.scss']
})

export class InsertionListComponent implements OnInit {
    @ViewChild('field') field: any;

    public insertions: Pagination = new Pagination();

    public fields: any = {
        options: [
            { value: 'id', label: 'ID' },
            { value: 'insertion_id', label: 'ID do pai' },
            { value: 'campaign_name', label: 'Nome da Campanha' },
            { value: 'pi_number', label: 'Número PI (A.D)' },
            { value: 'reference_date', label: 'Referência' },
            { value: 'area', label: 'Área' },
            { value: 'media', label: 'Mídia' },
            { value: 'impact', label: 'Impacto' },
            { value: 'impact_type_id', label: 'Tipo de Impacto Planejado' },
            { value: 'initiative_id', label: 'Iniciativa' },
            { value: 'investment', label: 'Investimento' },
            { value: 'pi_not_rated', label: 'PI não valorado' },
            { value: 'pi_type_id', label: 'Tipo de PI' },
            { value: 'unit_cost', label: 'Custo unitário (Modelo de Compra)' },
            { value: 'comments', label: 'Observações' },
            { value: 'company_id', label: 'Empresa' },
            { value: 'created_at', label: 'Data Criação' },
            { value: 'user', label: 'Usuário' },
            { value: 'media_owner', label: 'Veículo' },
            { value: 'media_objective', label: 'Objetivo' },
            { value: 'media_adserver_platform', label: 'AD Server/Plataforma' }

            // {value: 'excel_download', label: 'Baixar Excel'}

        ],
        selected: this.insertionFilterService.getSelectedFilters()
    };


    public search: any = this.insertionFilterService.getSearch();

    public sort: any = this.insertionFilterService.getSort();

    public flags: Array<Flag> = [];

    public pi_types: Array<PiType> = [];

    public impact_types: Array<ImpactType> = [];

    public companies: Array<Company> = [];

    public dataToDownload = [];

    public excel: Array<any> = [{ label: 'selected', value: 'Selecionados' }];

    private canSubmit = true;


    public modalStatusCreativeLine = {
        show: false,
        insertion: null
    };

    idBloqueio: number;

    constructor(private insertionService: InsertionService,
        private piTypeService: PiTypeService,
        private flagService: FlagService,
        private impactTypesService: ImpactTypesService,
        private companyService: CompanyService,
        private insertionFilterService: InsertionFilterService,
        private accessLevelService: AccessLevelService,
        private router: Router,
        private layoutService: CoreService,
        private downloadService: DownloadService,
        private sharedMethods: SharedMethodsService,
        private alertService: AlertService,
        private medmiaModuleService: MediaModuleService,
        private toastrService: ToastrService) {
    }

    ngOnInit() {

        this.toastrService.clear();

        this.insertionService.getIdBloqueio().subscribe((data: number) => {
            this.idBloqueio = data;
        });

        this.getInsertions(1);

        this.flagService.all().subscribe(data => {
            this.flags = data;
        });

        this.piTypeService.all().subscribe(data => {
            this.pi_types = data;
        });

        this.impactTypesService.all().subscribe(data => {
            this.impact_types = data;
        });

        this.companyService.all().subscribe(data => {
            this.companies = data;
        });

        this.field.select(this.fields.selected);
        this.reload();


        this.insertionFilterService.getCheckedItens().map((elem) => this.dataToDownload.push(elem));
    }


    onSelectField(option: IOption) {
        this.fields.selected = this.insertionFilterService.addSelectedFilters(option.value);
        this.reload();
    }

    onDeselectedField(option: IOption) {
        this.fields.selected = this.insertionFilterService.removeSelectedFilters(option.value);
        this.reload();
    }

    reload() {
        setTimeout(() => {
            this.layoutService.reload();
        }, 500);
    }

    changeCheck(event, insertionId: number, campaignName: string, mediaOwner: string) {
        if (event.target.checked) {
            this.dataToDownload.push({ id: insertionId, campaignName: campaignName, mediaOwner: mediaOwner });
            this.insertionFilterService.addCheckedItens({ id: insertionId, campaignName: campaignName, mediaOwner: mediaOwner });
            return;
        } else {
            this.insertionFilterService.removeCheckedFilters(insertionId);
            this.dataToDownload.splice(0, this.dataToDownload.length);
            this.insertionFilterService.getCheckedItens().map((elem) => this.dataToDownload.push(elem));
            return;
        }
    }

    check(insertionId: number) {
        return this.insertionFilterService.getCheckedItens().filter((elem: any, index, arr) =>
            elem.id === insertionId
        ).length > 0;
    }

    sorting($event) {
        if (!$event.direction) {
            $event.column = '';
        }

        this.sort = $event;

        this.insertionFilterService.setSort(this.sort);
        this.getInsertions(1);
    }

    searchingExcel(data, select) {
        this.search.excel_download = select ? data.map((elem) => {
            return elem.id;
        }) : [];
        this.insertionFilterService.setSearch(this.search);
        this.getInsertions();
    }

    searching() {
        this.insertionFilterService.setSearch(this.search);
        this.getInsertions();
    }

    getInsertions(page: number = 1) {
        this.insertionService.all(page, this.search, this.sort).subscribe(data => {
            this.insertions = data;
            this.alertService.callAlert();
        }, error => {
            return new ErrorHandler(error).show();
        });
    }

    confirmDuplicate(insertion: Insertion) {
        if (( insertion.id <= this.idBloqueio && this.medmiaModuleService.isEqual(insertion.media, 'DIGITAL')))  {
            this.sharedMethods.openErrorMessage('old-version');
        } else {
            if (!this.canSubmit) {
                return;
            }
            this.canSubmit = false;
            const self = this;
            swal.fire({
                title: 'Alerta!',
                text: 'Confirmar duplicação desta inserção: ' + insertion.campaign_name + ' (' + insertion.id + ')?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, continuar!',
                cancelButtonText: 'Não, cancelar!'
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
                return new SuccessHandler('Chave de inserção duplicada com sucesso.').show().then(() => {
                    this.accessLevelService.is_accessible('insertions', 'App\\Http\\Controllers\\Api\\InsertionController@forceUpdate')
                        .subscribe((data: boolean) => {
                            if (data) {
                                return this.router.navigate(['/insertions/force-update'], { queryParams: { id: response.id } });
                            } else {
                                return this.router.navigate(['/insertions/update'], { queryParams: { id: response.id } });
                            }
                        });
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

    update(insertion: Insertion) {

        if (( insertion.id <= this.idBloqueio && this.medmiaModuleService.isEqual(insertion.media, 'DIGITAL'))) {
            this.sharedMethods.openErrorMessage('old-version');
        } else {
            this.accessLevelService.is_accessible('insertions', 'App\\Http\\Controllers\\Api\\InsertionController@forceUpdate')
                .subscribe((data: boolean) => {
                    if (data) {
                        return this.router.navigate(['/insertions/force-update'], { queryParams: { id: insertion.id } });
                    } else {
                        return this.router.navigate(['/insertions/update'], { queryParams: { id: insertion.id } });
                    }
                }
                );
        }
    }

    confirm(insertion: Insertion) {
        if (!this.canSubmit) {
            return;
        }
        this.canSubmit = false;
        const self = this;

        swal.fire({
            title: 'Alerta!',
            text: 'Confirmar exclusão da chave de inserção: ' + insertion.campaign_name + ' (' + insertion.id + ')?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, continuar!',
            cancelButtonText: 'Não, cancelar!'
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
                this.alertService.callAlert();
                this.insertions.data.splice(this.insertions.data.indexOf(insertion), 1);
            });
        }, error => {
            this.canSubmit = true;
            return new ErrorHandler(error).show();
        });
    }

    clearFilters() {
        this.insertionFilterService.clearFilters();

        this.fields.selected = this.insertionFilterService.getSelectedFilters();

        this.field.select(this.fields.selected);
        this.reload();
    }

    clearSearch() {
        this.insertionFilterService.clearSearch();

        this.search = this.insertionFilterService.getSearch();
        this.sort = this.insertionFilterService.getSort();

        this.getInsertions();
    }

    downloadExcel(insertion: Insertion) {
        this.insertionService.downloadExcel([insertion.id]).subscribe((data) => {
            this.downloadService.run(data, 'urls.xlsx');

        }, error => {
            if (error.status === 404) {
                return this.router.navigate(['/error/404']);
            }

            return new ErrorHandler(error).show();
        });
    }

    endModalStatusCreativeLine() {

        this.modalStatusCreativeLine.show = false;

    }

    startModalStatusCreativeLine(insertion: Insertion) {
        this.modalStatusCreativeLine.insertion = insertion;
        this.modalStatusCreativeLine.show = true;
        // this.insertionService.downloadExcel([insertion.id]).subscribe((data) => {
        //     this.downloadService.run(data, 'urls.xlsx');
        //
        // }, error => {
        //     if (error.status === 404) {
        //         return this.router.navigate(['/error/404']);
        //     }
        //
        //     return new ErrorHandler(error).show();
        // });
    }

    /*
    nome
    AGUARDANDO-PECA



    ENVIADO
    INATIVADO



     */
    checkAgencyPending(insertionPAgeItem) {
        const agencyPendingStatus = ['AGUARDANDO-PECA'];
        if (!this.medmiaModuleService.isEqual(insertionPAgeItem.media, 'DIGITAL')) {
            return '';
        }

        const qtyPending = insertionPAgeItem.insertion_digital.reduce((total, item) => {
            if (agencyPendingStatus.indexOf(item.status) !== -1) {
                return total + 1;
            }
            return total;
        }, 0);

        return qtyPending === 0 ? 'color-green' : 'color-red';


    }

    checkPredictaPending(insertionPAgeItem) {
        if (parseInt(insertionPAgeItem.fl_sent_programatic_agency, 10) === 1) {
            const agencyPendingStatus = ['INSERIR', 'INATIVAR', 'ALTERAR', 'ALTERAR-PECA', 'ALTERAR-URL'];
            // console.log();
            if (!this.medmiaModuleService.isEqual(insertionPAgeItem.media, 'DIGITAL')) {
                return '';
            }
            const qtyPending = insertionPAgeItem.insertion_digital.reduce((total, item) => {
                if (agencyPendingStatus.indexOf(item.status) !== -1) {
                    return total + 1;
                }
                return total;
            }, 0);
            return qtyPending === 0 ? 'color-green' : 'color-red';
        } else {
            return 'color-yellow';
        }
    }
}
