import {Component, Input, OnInit} from '@angular/core';
import {MrmService} from '../mrm.service';
import {CoreService} from '../../../../../core/core.service';
import {Insertion} from '../../../../../shared/models/insertion';
import {Mrm} from '../../../../../shared/models/mrm';
import {ErrorHandler} from '../../../../../shared/http/responses/error-handler';
import {SuccessHandler} from '../../../../../shared/http/responses/success-handler';
import swal from 'sweetalert2';

@Component({
    selector:    'app-default-mrm',
    templateUrl: './default-mrm.component.html'
})

export class DefaultMrmComponent implements OnInit {
    public insertion: Insertion;

    public mrm: Array<Mrm> = [];
    public modal: any = {
        show:   false,
        action: 'create',
        mrm:    new Mrm()
    };
    private canSubmmit = true;

    constructor(private mrmService: MrmService, private layoutService: CoreService) {
    }

    @Input()
    set _insertion(insertion: Insertion) {
        this.insertion = insertion;

        if (typeof this.insertion.id !== 'undefined') {
            this.getSeen();
        }
    }

    ngOnInit() {
        this.layoutService.reload();
    }

    getSeen() {
        this.mrmService.all(this.insertion).subscribe(data => {
            this.mrm = data;
        }, error => {
            return new ErrorHandler(error).show();
        });
    }

    close() {
        this.endModal();
        this.getSeen();
    }

    endModal() {
        this.modal.show = false;
    }

    showModal(mrm?: Mrm) {
        this.modal.action = 'create';

        if (mrm) {
            this.modal.mrm = Object.assign({}, mrm);
            this.modal.action = 'update';
        }

        this.modal.show = true;
    }

    confirm(mrm: Mrm) {
        if (!this.canSubmmit) {
            return;
        }
        this.canSubmmit = false;
        let self = this;

        swal.fire({
            title:             'Alerta!',
            text:              'Confirmar exclusão da peça: ' + mrm.id + '?',
            type:              'warning',
            showCancelButton:  true,
            confirmButtonText: 'Sim, continuar!',
            cancelButtonText:  'Não, cancelar!'
        }).then((response: any) => {
            this.canSubmmit = true;
            if (!response.dismiss) {
                self.destroy(mrm);
            }
        });
    }

    destroy(mrm: Mrm) {
        if (!this.canSubmmit) {
            return;
        }
        this.canSubmmit = false;
        this.mrmService.destroy(this.insertion, mrm).subscribe(() => {
            this.canSubmmit = true;
            return new SuccessHandler('Investimento da campanha excluído com sucesso.').show().then(() => {
                this.mrm.splice(this.mrm.indexOf(mrm), 1);
            });
        }, error => {
            this.canSubmmit = true;
            return new ErrorHandler(error).show();
        });
    }
}
