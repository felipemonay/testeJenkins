import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MmmService} from '../../mmm.service';
import {Group} from '../../../../../../shared/models/group';
import {Insertion} from '../../../../../../shared/models/insertion';
import {ErrorHandler} from '../../../../../../shared/http/responses/error-handler';
import {SuccessHandler} from '../../../../../../shared/http/responses/success-handler';
import swal from 'sweetalert2';
import { InsertionToastService } from 'src/app/modules/insertions/insertion-toast.service';

@Component({
    selector:    'app-modal-group',
    templateUrl: './modal-group.component.html'

})

export class ModalGroupComponent {
    @Input()
    public show: boolean = false;

    @Input()
    public action: string = 'create';

    @Output()
    public doClose: EventEmitter<any> = new EventEmitter();

    @Output()
    public doCancel: EventEmitter<any> = new EventEmitter();

    public group: Group = new Group();

    public insertion: Insertion = new Insertion();

    private canSubmit = true;

    constructor(private mmmService: MmmService,private insertionToastService:InsertionToastService) {
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
                this.mmmService.isNewGroup = true;
                this.close();
            });
        }, error => {
            this.canSubmit = true;
            return new ErrorHandler(error).show();
        });
    }

    alert() {
        if (this.group.currentName !== this.group.name) {
            swal.fire({
                title:             'Alerta!',
                text:              'Você está prestes a alterar o nome da linha criativo (Título PI), confirma esta ação?',
                type:              'warning',
                showCancelButton:  true,
                confirmButtonText: 'Sim, continuar!',
                cancelButtonText:  'Não, cancelar!'
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
            this.canSubmit = true;
            this.insertionToastService.updateToastr(this.insertion);
            return new SuccessHandler('Alterações realizadas com sucesso.').show().then(() => {
                this.close();
            });
        }, error => {
            this.canSubmit = true;
            return new ErrorHandler(error).show();
        });
    }
}
