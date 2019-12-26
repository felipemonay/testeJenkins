import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ErrorHandler } from '../../../shared/http/responses/error-handler';
import { SuccessHandler } from '../../../shared/http/responses/success-handler';
import { Insertion } from '../../../shared/models/insertion';
import { AccessLevelService } from '../../../shared/services/access-level.service';
import { InsertionToastService } from '../insertion-toast.service';
import { InsertionService } from '../insertion.service';

@Component({
    selector: 'app-insertion-create',
    templateUrl: './insertion-create.component.html'

})

export class InsertionCreateComponent implements OnInit {
    public insertion: Insertion = new Insertion();
    public admin: boolean = false;
    private access_level: any = {
        page: 'insertions',
        action: 'App\\Http\\Controllers\\Api\\InsertionController@forceStore'
    };
    private canSubmmit = true;

    constructor(private insertionService: InsertionService,
        private accessLevelService: AccessLevelService,
        private router: Router,
        private insertionToastService: InsertionToastService) {
    }

    ngOnInit() {
        this.accessLevelService.is_accessible(this.access_level.page, this.access_level.action).subscribe((response: boolean) => {
            this.admin = response;
        });
    }

    send() {
        if (!this.insertion.campaign_name.match(/cc-/ig)) {
            if (!this.canSubmmit) {
                return;
            }
            this.canSubmmit = false;
            if (!this.admin) {
                return this.create();
            }

            return this.forceCreate();
        } else {
            swal.fire('Atenção', 'O nome da campanha não pode conter "cc" ', 'error');
        }
    }

    create() {
        this.insertionService.create(this.insertion).subscribe((insertion: Insertion) => {
            this.canSubmmit = true;
            this.insertionToastService.updateToastr(insertion);
            return new SuccessHandler('Inserção cadastrada com sucesso.').show().then(() => {
                return this.router.navigate(['/insertions/update'], { queryParams: { id: insertion.id } });
            });
        }, error => {
            this.canSubmmit = true;
            return new ErrorHandler(error).show();
        }, () => {
            this.canSubmmit = true;
        });
    }

    forceCreate() {
        this.insertionService.forceCreate(this.insertion).subscribe((insertion: Insertion) => {
            this.canSubmmit = true;
            this.insertionToastService.updateToastr(insertion);
            return new SuccessHandler('Inserção cadastrada com sucesso.').show().then(() => {
                return this.router.navigate(['/insertions/force-update'], { queryParams: { id: insertion.id } });
            });
        }, error => {
            this.canSubmmit = true;
            return new ErrorHandler(error).show();
        }, () => {
            this.canSubmmit = true;
        });
    }
}
