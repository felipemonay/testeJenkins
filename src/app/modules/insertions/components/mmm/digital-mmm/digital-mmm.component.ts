import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Insertion } from '../../../../../shared/models/insertion';
import { Group } from '../../../../../shared/models/group';
import { Tag } from '../../../../../shared/models/tag';
import { MmmService } from '../mmm.service';
import { ClipboardService } from '../../../../../shared/services/clipboard.service';
import { CoreService } from '../../../../../core/core.service';
import { ErrorHandler } from '../../../../../shared/http/responses/error-handler';
import swal from 'sweetalert2';
import { SuccessHandler } from '../../../../../shared/http/responses/success-handler';
import { Extra } from '../../../../../shared/models/extra';
import { AccessLevelService } from 'src/app/shared/services/access-level.service';

@Component({
    selector: 'app-digital-mmm',
    templateUrl: './digital-mmm.component.html'
})

export class DigitalMmmComponent implements OnInit, OnDestroy {
   
    public insertion: Insertion = new Insertion();
    public extra: Extra = new Extra();
    public isAdmin: boolean = false;

    public groups: Array<Group> = [];
    public modalShow: any = {
        show: false,
        tag: new Group()
    };
    public modal: any = {
        show: { groupTag: false, tag: false, excel: false, wizard: false },
        action: { group: 'create', tag: 'create', excel: 'create' },
        group: new Group(),
        tag: new Tag(),
        excel: Array
    };
    public insertionStatus = {
        isNewRecord: false,
        isConfirmed: false,
        isDuplicated: false
    };
    private canSubmit = true;

    constructor(private mmmService: MmmService, private clipboard: ClipboardService, private layoutService: CoreService,
        private accessLevelService: AccessLevelService) {
    }

    @Input()
    set _insertion(insertion: Insertion) {
        this.insertion = insertion;

        if (insertion.extra) {
            this.extra = insertion.extra;
        }

        if (typeof this.insertion.id !== 'undefined') {
            this.getGroups();
        }
        this.insertionStatus.isNewRecord = !this.insertion.id;
        this.insertionStatus.isDuplicated = !!this.insertion.insertion_id;
        this.insertionStatus.isConfirmed = !!(this.insertion.confirmation && this.insertion.confirmation.id);
        if (!insertion.extra.insertion_id) {
            this.checkInsertionsHasExtra();
        }
    }



    checkInsertionsHasExtra = () => {
        // setTimeout(() => {
        //     if (!this.insertion.extra.insertion_id) {
        //         this.checkInsertionsHasExtra();
        //     }
        // }, 3000);
    };

    ngOnInit() {
        this.checkAcessPrivilages();
    }

    ngOnDestroy(): void {
        this.isAdmin = false;
    }

    checkAcessPrivilages() {
        let access_level: any = {
            page: 'insertions',
            action: 'App\\Http\\Controllers\\Api\\InsertionController@forceStore'
        };
        this.accessLevelService.is_accessible(access_level.page, access_level.action).subscribe((data) => {
            if (data) {
                this.isAdmin = true;
            } else {
                this.isAdmin = false;
            }
        });
    }

    getGroups() {
        this.mmmService.groups(this.insertion).subscribe(data => {
            this.groups = data;
            setTimeout(() => {
                this.layoutService.reload();
            }, 1000);
        }, error => {
            return new ErrorHandler(error).show();
        });
    }

    close() {
        this.endModal();
        this.getGroups();
    }

    endModal() {
        this.modal.show.groupTag = false;
        this.modal.show.tag = false;
        this.modal.show.excel = false;
        this.modalShow.wizard = false;
        this.modal.group = new Group();
        this.modal.tag = new Tag();
    }

    showModalGroup(group?: Group) {

        this.modal.action.group = 'create';

        if (group) {
            this.modal.group = Object.assign({}, group);
            this.modal.action.group = 'update';
        }

        this.modal.show.groupTag = true;
    }

    showModalTag(group: Group, tag?: Tag) {
        this.modal.group = Object.assign({}, group);
        this.modal.action.tag = 'create';

        if (tag) {
            this.modal.tag = Object.assign({}, tag);
            this.modal.action.tag = 'update';
        }

        this.modal.show.tag = true;
    }

    showModalExcel(group: Group) {
        this.modalShow.group = group;
        this.modalShow.show = true;
    }

    closeModalExcel($event) {
        this.modalShow.show = false;
        this.modalShow.group = new Group();
    }


    showModalExcelEdit(group: Group) {
        this.mmmService.showExtra(this.insertion).subscribe(data => {

            if (!data.media_adserver_platform || !data.media_owner) {
                return new ErrorHandler().show('Para preencher a planilha (Digital) é necessário informar o AD Server/Plataforma.');
            } else if (group.insertion_tags.length == 0) {
                return new ErrorHandler().show('Para preencher a planilha (Digital) é necessário cadastrar as tags da linha criativo (Título PI).');
            } else {
                this.extra = data;
                this.modal.group = Object.assign({}, group);


                if (!group.digital) {
                    this.modal.action.excel = 'create';
                } else {
                    this.modal.action.excel = 'update';
                }

                this.modal.show.excel = true;
            }

        }, error => {

            return new ErrorHandler(error).show('Para preencher a planilha (Digital) é necessário informar o AD Server/Plataforma.');
        });


    }

    status(group: Group, tag: Tag, priority: boolean) {
        tag.priority = priority;
        this.mmmService.updateTag(this.insertion, group, tag).subscribe(() => {
        }, error => {
            tag.priority = !tag.priority;
            return new ErrorHandler(error).show();
        });
    }

    copyHash() {
        let hash = '';

        this.groups.forEach((value, index, arr) => hash += value.name + '=' + value.hash + '\n');

        this.clipboard.copy(hash);
    }

    confirm(group: Group) {
        if (!this.canSubmit) {
            return;
        }
        this.canSubmit = false;
        const self = this;
        let g = group;
        swal.fire({
            title: 'Alerta!',
            text: 'Confirmar exclusão da peça: ' + g.name + '?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, continuar!',
            cancelButtonText: 'Não, cancelar!'
        }).then((response: any) => {
            this.canSubmit = true;
            if (!response.dismiss) {
                self.destroy(group);
            }
        });
    }


    destroy(group: Group) {
        if (!this.canSubmit) {
            return;
        }
        this.canSubmit = false;
        this.mmmService.destroy(this.insertion, group).subscribe(() => {
            this.canSubmit = true;
            return new SuccessHandler('Peça excluída com sucesso.').show().then(() => {
                this.groups.splice(this.groups.indexOf(group), 1);
                this.hasNewGroup();
            });
        }, error => {
            this.canSubmit = true;
            return new ErrorHandler(error).show();
        });
    }

    confirmTag(group: Group, tag: Tag) {
        if (!this.canSubmit) {
            return;
        }
        this.canSubmit = false;
        const self = this;

        swal.fire({
            title: 'Alerta!',
            text: 'Confirmar exclusão da tag pertencente a peça: ' + group.name + '?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, continuar!',
            cancelButtonText: 'Não, cancelar!'
        }).then((response: any) => {
            this.canSubmit = true;
            if (!response.dismiss) {
                self.destroyTag(group, tag);
                self.hasNewGroup();
            }
        });

    }

    hasNewGroup() {
        let groups: Array<Group>;
        this.mmmService.groups(this.insertion).subscribe(async data => {
            groups = await data;
            groups.forEach(g => {
                if (g.hash === undefined || g.hash === '') {
                    this.mmmService.isNewGroup = true;
                } else {
                    this.mmmService.isNewGroup = false;
                }
            })
        }, error => {
            return new ErrorHandler(error).show();
        });
    }

    destroyTag(group: Group, tag: Tag) {
        if (!this.canSubmit) {
            return;
        }
        this.canSubmit = false;
        this.mmmService.destroyTag(this.insertion, group, tag).subscribe(() => {
            return new SuccessHandler('Tag excluída com sucesso.').show().then(() => {
                this.canSubmit = true;
                group.insertion_tags.splice(group.insertion_tags.indexOf(tag), 1);
                this.getGroups();
                this.hasNewGroup();
            });
        }, error => {
            this.canSubmit = true;
            this.getGroups();
            return new ErrorHandler(error).show();
        });
    }


}
