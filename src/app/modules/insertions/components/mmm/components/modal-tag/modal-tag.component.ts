import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IOption} from 'ng-select';
import {MmmService} from '../../mmm.service';
import {Insertion} from '../../../../../../shared/models/insertion';
import {Group} from '../../../../../../shared/models/group';
import {Tag} from '../../../../../../shared/models/tag';
import {CategoryMmmService} from '../../../../../../shared/services/redshift/category-mmm.service';
import {ErrorHandler} from '../../../../../../shared/http/responses/error-handler';
import {SuccessHandler} from '../../../../../../shared/http/responses/success-handler';
import {forkJoin} from 'rxjs';
import swal from 'sweetalert2';

@Component({
    selector:    'app-modal-tag',
    templateUrl: './modal-tag.component.html'

})

export class ModalTagComponent implements OnInit {
    @Input()
    public action = 'create';

    @Input()
    public group: Group = new Group();

    @Input()
    public insertion: Insertion = new Insertion();

    @Input()
    public tag: Tag = new Tag();

    @Output()
    public doClose: EventEmitter<any> = new EventEmitter();

    @Output()
    public doCancel: EventEmitter<any> = new EventEmitter();

    public selected_categories: Array<any> = [];
    public categories = {
        field:       '',
        placeholder: '',
        options:     []
    };
    public options: Array<IOption> = [];
    public selecting_category = '';
    public loading = false;
    private canSubmmit = true;

    constructor(private mmmService: MmmService, private categoryMmmService: CategoryMmmService) {
    }

    public _show = false;

    @Input()
    set show(show: boolean) {
        if (show === true && this.action === 'update') {
            this.exchange();
        }

        this._show = show;
    }

    ngOnInit() {
        this.getCategories();
    }

    exchange() {
        this.loading = true;

        const post = [
            this.tag.primary_segmentation,
            this.tag.secondary_segmentation,
            this.tag.nature,
            this.tag.objective,
            this.tag.product
        ];

        this.categoryMmmService.categoriesWaterfall(post).subscribe(data => {
            for (let i in data) {
                this.categories = data[i];
                this.options = this.categoryMmmService.toOptions(data[i]);

                this.selected_categories.push({
                    field:       this.categories.field,
                    placeholder: this.categories.placeholder,
                    value:       post[i]
                });
            }

            this.categories.options = [];

            this.loading = false;
        }, error => {
            this.loading = false;
            return new ErrorHandler(error).show();
        });
    }

    destroy(selected_category) {
        this.selected_categories.splice(this.selected_categories.indexOf(selected_category), this.selected_categories.length);
        this.getCategories();
    }

    onSelect(option: IOption) {
        this.selecting_category = option.value;
        this.select();
    }

    select() {
        this.selected_categories.push({
            field:       this.categories.field,
            placeholder: this.categories.placeholder,
            value:       this.selecting_category
        });

        this.selecting_category = '';
        return this.getCategories();
    }

    getCategories() {

        this.loading = true;
        this.categories.options = [];

        this.categoryMmmService.categories(this.selected_categories).subscribe(data => {
            this.categories = data;

            this.loading = false;

            this.options = this.categoryMmmService.toOptions(data);
        }, error => {
            this.loading = false;
            return new ErrorHandler(error).show();
        });
    }

    close() {
        this.selecting_category = '';
        this.selected_categories = [];
        this.getCategories();
        this.doClose.emit(true);
        this.group = new Group();
        this.tag = new Tag();
    }

    cancel() {
        this.selecting_category = '';
        this.selected_categories = [];
        this.getCategories();
        this.doCancel.emit(true);
        this.group = new Group();
        this.tag = new Tag();
    }

    send() {
        for (let i in this.selected_categories) {
            this.tag[this.selected_categories[i].field] = this.selected_categories[i].value;
        }


        forkJoin([
            this.mmmService.checkUtm(this.insertion, this.group, this.group.digital),
            this.mmmService.checkCPSP(this.insertion, this.group, this.group.digital),
            this.mmmService.checkStringLimits(this.insertion, this.group, this.group.digital)]).subscribe(responseList => {
            let utmText = '';
            let cpspText = '';

            let limitCampaignText = '';
            let limitAdGroupText = '';
            let limitAdText = '';
            const utmList: Array<number> = (responseList[0].constructor === Array) ? responseList[0] as Array<number> : [];
            const cpspList: Array<number> = (responseList[1].constructor === Array) ? responseList[1] as Array<number> : [];
            const checkStringList: any = responseList[2];


            const swalDelayed = (utmList.length + cpspList.length) > 1 ? 5 : 0;

            if (utmList.length > 0) {
                utmText = '<br><strong><i class="fa fa-warning " style="color:#ff8c00" ></i> ' +
                          'Linhas com mais de 100 caracteres nas UTMs: </strong>' + utmList.toString();
            }
            if (cpspList.length > 0) {
                cpspText = '<br> <i class="fa fa-warning " style="color:#ff8c00" ></i> ' +
                           '<strong>Linhas sem correlação de CP/SP: </strong>' + cpspList.toString();
            }
            if (checkStringList.limit_campaign.length > 0) {
                limitCampaignText = '<br> <i class="fa fa-warning " style="color:#ff8c00" ></i> ' +
                                    '<strong>Linhas com mais de 128 caracteres na campanha (plataforma): </strong>' +
                                    checkStringList.limit_campaign.toString();
            }

            if (checkStringList.limit_ad_group.length > 0) {
                limitAdGroupText = '<br> <i class="fa fa-warning " style="color:#ff8c00" ></i> ' +
                                   '<strong>Linhas com mais de 255 caracteres no conjunto de anúncios (plataforma): </strong>' +
                                   checkStringList.limit_ad_group.toString();
            }

            if (checkStringList.limit_ad.length > 0) {
                limitAdText = '<br> <i class="fa fa-warning " style="color:#ff8c00" ></i> ' +
                              '<strong>Linhas com mais de 255 caracteres no anúncio (plataforma): </strong>' +
                              checkStringList.limit_ad.toString();
            }




            if ((utmText + cpspText + limitCampaignText + limitAdGroupText + limitAdText).length === 0) {
                return (this.action === 'create') ? this.create() : this.update();
            } else {
                const alertText = this.action === 'create' ? 'Confirmar adição da tag?' : 'Confirmar edição da tag?';
                swal.fire({
                    title:             'Alerta!',
                    html:              '<div style="text-align: center"><br>' + alertText + '  <br>' +
                                       utmText +
                                       cpspText +
                                       limitCampaignText +
                                       limitAdGroupText +
                                       limitAdText +
                                       '</div>',
                    type:              'warning',
                    showCancelButton:  true,
                    showConfirmButton: false,
                    showCloseButton:   false,

                    allowEscapeKey:    true,
                    allowOutsideClick: false,

                    confirmButtonText: ' ',
                    cancelButtonText:  'Não, cancelar!',

                    onOpen: function () {
                        swal.showLoading();
                        swal.disableButtons();

                        setTimeout(() => {
                            swal.hideLoading();
                            swal.enableButtons();
                            const confirm = swal.getConfirmButton();
                            confirm.innerHTML = 'Sim, confirmar!';
                            confirm.style.display = 'inline-block';

                        }, swalDelayed * 1000, swal);
                    }

                }).then((response: any) => {
                    // this.canSubmit = true;

                    if (!response.dismiss) {
                        return (this.action === 'create') ? this.create() : this.update();
                        // return this.createOrUpdate();
                    }
                });
            }


        }, error => {
            return new ErrorHandler(error).show();
        });


    }

    create() {
        if (!this.canSubmmit) {
            return;
        }
        this.canSubmmit = false;
        if (!this.group.insertion_tags.length) {
            this.tag.priority = true;
        }

        this.mmmService.createTag(this.insertion, this.group, this.tag).subscribe(data => {
            this.canSubmmit = true;
            return new SuccessHandler('Tag cadastrada com sucesso.').show().then(() => {
                this.close();
            });
        }, error => {
            this.canSubmmit = true;
            return new ErrorHandler(error).show();
        });
    }

    update() {
        if (!this.canSubmmit) {
            return;
        }
        this.canSubmmit = false;
        this.mmmService.updateTag(this.insertion, this.group, this.tag).subscribe(data => {
            this.canSubmmit = true;
            return new SuccessHandler('Alterações realizadas com sucesso.').show().then(() => {
                this.close();
            });
        }, error => {
            this.canSubmmit = true;
            return new ErrorHandler(error).show();
        });
    }
}
