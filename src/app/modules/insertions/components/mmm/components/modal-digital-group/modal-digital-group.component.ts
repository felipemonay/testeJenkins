import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MmmService } from '../../mmm.service';
import { Group } from '../../../../../../shared/models/group';
import { Insertion } from '../../../../../../shared/models/insertion';
import { ErrorHandler } from '../../../../../../shared/http/responses/error-handler';
import { SuccessHandler } from '../../../../../../shared/http/responses/success-handler';
import swal from 'sweetalert2';
import { InsertionToastService } from 'src/app/modules/insertions/insertion-toast.service';

declare var require: any;
const dateFormat = require('dateformat');

@Component({
    selector: 'app-modal-digital-group',
    templateUrl: './modal-digital-group.component.html'

})

export class ModalDigitalGroupComponent implements OnInit {

    @Input()
    public action = 'create';
    @Output()
    public doClose: EventEmitter<any> = new EventEmitter();
    @Output()
    public doCancel: EventEmitter<any> = new EventEmitter();
    public group: Group = new Group();
    public insertion: Insertion = new Insertion();
    public show = false;
    private canSubmit = true;

    constructor(private mmmService: MmmService, private insertionToastService: InsertionToastService) {
    }

    @Input()
    set _show(show) {
        setTimeout(() => {
            this.show = show;
        }, 100);

    }

    @Input()
    set _insertion(insertion: Insertion) {
        this.insertion = insertion;
    }


    @Input()
    set _group(group: Group) {
        this.group = group;
        this.group.currentName = this.group.name;
    }

    ngOnInit() {
        this.insertion.extra.initial_date;
    }

    close = () => {
        this.group = new Group();
        this.doClose.emit(true);
    };

    cancel = () => {
        this.group = new Group();
        this.doCancel.emit(true);
    };

    send() {
        (this.action === 'create') ? this.create() : this.alert();
    }

    create() {
        if (!this.canSubmit) {
            return;
        }
        this.canSubmit = false;
        this.mmmService.create(this.insertion, this.group).subscribe(data => {
            this.canSubmit = true;
            this.insertionToastService.updateToastr(this.insertion);
            return new SuccessHandler('Peça cadastrada com sucesso.').show().then(() => {
                this.hasNewGroup();
                this.close();
            });
        }, error => {
            this.canSubmit = true;
            return new ErrorHandler(error).show();
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

    alert() {
        if (this.group.currentName !== this.group.name) {
            swal.fire({
                title: 'Alerta!',
                text: 'Você está prestes a alterar o nome da linha criativo (Título PI), confirma esta ação?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, continuar!',
                cancelButtonText: 'Não, cancelar!'
            }).then((response: any) => {
                this.canSubmit = true;
                if (!response.dismiss) {
                    return this.update();
                }
            });
        } else {
            return this.update();
        }
    }

    update() {
        if (!this.canSubmit) {
            return;
        }
        this.canSubmit = false;
        this.mmmService.update(this.insertion, this.group).subscribe(data => {
            this.insertionToastService.updateToastr(this.insertion);
            return new SuccessHandler('Alterações realizadas com sucesso.').show().then(() => {
                this.canSubmit = true;
                this.close();
            });
        }, error => {
            this.canSubmit = true;
            return new ErrorHandler(error).show();
        });
    }
}
