import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Insertion} from '../../../../../../shared/models/insertion';
import {Mrm} from '../../../../../../shared/models/mrm';
import {MrmService} from '../../mrm.service';
import {ErrorHandler} from '../../../../../../shared/http/responses/error-handler';
import {SuccessHandler} from '../../../../../../shared/http/responses/success-handler';

@Component({
    selector:    'app-modal',
    templateUrl: './modal.component.html'
})

export class ModalComponent {
    @Input()
    public show: boolean = false;

    @Input()
    public action: string = 'create';

    @Input()
    public mrm: Mrm = new Mrm();

    @Input()
    public insertion: Insertion = new Insertion();
    @Output()
    public doClose: EventEmitter<any> = new EventEmitter();
    @Output()
    public doCancel: EventEmitter<any> = new EventEmitter();
    private canSubmmit = true;

    constructor(private mrmService: MrmService) {
    }

    changeCheckbox() {
        if (!this.mrm.marketing_check) {
            this.mrm.action_id = null;
            this.mrm.piece_id = null;
        }

        if (!this.mrm.others_check) {
            this.mrm.others = null;
        }
    }

    close = () => {
        this.mrm = new Mrm();
        this.doClose.emit(true);
    };

    cancel = () => {
        this.mrm = new Mrm();
        this.doCancel.emit(true);
    };

    send() {
        (this.action === 'create') ? this.create() : this.update();
    }

    create() {
        if (!this.canSubmmit) {
            return;
        }
        this.canSubmmit = false;
        this.mrmService.create(this.insertion, this.mrm).subscribe(() => {
            this.canSubmmit = true;
            return new SuccessHandler('Investimento da campanha cadastrado com sucesso.').show().then(() => {
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
        this.mrmService.update(this.insertion, this.mrm).subscribe(() => {
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
