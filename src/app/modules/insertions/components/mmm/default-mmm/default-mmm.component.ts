import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MmmService } from '../mmm.service';
import { CoreService } from '../../../../../core/core.service';
import { Insertion } from '../../../../../shared/models/insertion';
import { Group } from '../../../../../shared/models/group';
import { Tag } from '../../../../../shared/models/tag';
import { ClipboardService } from '../../../../../shared/services/clipboard.service';
import { ErrorHandler } from '../../../../../shared/http/responses/error-handler';
import { SuccessHandler } from '../../../../../shared/http/responses/success-handler';
import swal from 'sweetalert2';
import { AccessLevelService } from 'src/app/shared/services/access-level.service';

@Component({
    selector: 'app-default-mmm',
    templateUrl: './default-mmm.component.html'

})

export class DefaultMmmComponent implements OnInit, OnDestroy {
    public insertion: Insertion = new Insertion();
    public isAdmin: boolean = false;

    public groups: Array<Group> = [];
    public modal: any = {
        show: { group: false, tag: false },
        action: { group: 'create', tag: 'create' },
        group: new Group(),
        tag: new Tag()
    };
    private canSubmmit = true;

    constructor(private mmmService: MmmService,
        private clipboard: ClipboardService,
        private layoutService: CoreService,
        private accessLevelService: AccessLevelService) {
    }

    @Input()
    set _insertion(insertion: Insertion) {
        this.insertion = insertion;

        if (typeof this.insertion.id !== 'undefined') {
            this.getGroups();
        }
    }

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
        this.modal.show.group = false;
        this.modal.show.tag = false;
        this.modal.group = new Group();
        this.modal.tag = new Tag();
    }

    showModalGroup(group?: Group) {
        this.modal.action.group = 'create';

        if (group) {
            this.modal.group = Object.assign({}, group);
            this.modal.action.group = 'update';
        }

        this.modal.show.group = true;
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

    status(group: Group, tag: Tag, priority: boolean) {
        tag.priority = priority;
        this.mmmService.updateTag(this.insertion, group, tag).subscribe((data) => {
        }, error => {
            tag.priority = !tag.priority;
            return new ErrorHandler(error).show();
        });
    }

    copyHash() {
        let hash = '';

        for (let i in this.groups) {
            hash += this.groups[i].name + '=' + this.groups[i].hash + '\n';
        }

        this.clipboard.copy(hash);
    }

    confirm(group: Group) {
        if (!this.canSubmmit) {
            return;
        }
        this.canSubmmit = false;
        let self = this;

        swal.fire({
            title: 'Alerta!',
            text: 'Confirmar exclusão da peça: ' + group.name + '?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, continuar!',
            cancelButtonText: 'Não, cancelar!'
        }).then((response: any) => {
            this.canSubmmit = true;
            if (!response.dismiss) {
                self.destroy(group);
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

    destroy(group: Group) {
        if (!this.canSubmmit) {
            return;
        }
        this.canSubmmit = false;
        this.mmmService.destroy(this.insertion, group).subscribe(() => {
            this.canSubmmit = true;
            return new SuccessHandler('Peça excluída com sucesso.').show().then(() => {
                this.groups.splice(this.groups.indexOf(group), 1);
                this.hasNewGroup();
            });
        }, error => {
            this.canSubmmit = true;
            return new ErrorHandler(error).show();
        });
    }

    confirmTag(group: Group, tag: Tag) {
        if (!this.canSubmmit) {
            return;
        }
        this.canSubmmit = false;
        const self = this;

        swal.fire({
            title: 'Alerta!',
            text: 'Confirmar exclusão da tag pertencente a peça: ' + group.name + '?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, continuar!',
            cancelButtonText: 'Não, cancelar!'
        }).then((response: any) => {
            this.canSubmmit = true;
            if (!response.dismiss) {
                self.destroyTag(group, tag);
            }
        });
    }

    destroyTag(group: Group, tag: Tag) {
        if (!this.canSubmmit) {
            return;
        }
        this.canSubmmit = false;
        this.mmmService.destroyTag(this.insertion, group, tag).subscribe(() => {
            this.canSubmmit = true;
            return new SuccessHandler('Tag excluída com sucesso.').show().then(() => {
                group.insertion_tags.splice(group.insertion_tags.indexOf(tag), 1);
                this.getGroups();
                this.hasNewGroup();
            });
        }, error => {
            this.canSubmmit = true;
            this.getGroups();
            return new ErrorHandler(error).show();
        });
    }
}
