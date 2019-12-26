import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { User } from '../../../../shared/models/user';
import { CoreService } from '../../../core.service';
import { AuthService } from '../../../../modules/auth/auth.service';
import { ErrorHandler } from '../../../../shared/http/responses/error-handler';
import { InsertionService } from '../../../../modules/insertions/insertion.service';
import { DownloadService } from '../../../../shared/services/download.service';
import { Router } from '@angular/router';

declare var require: any;
const CryptoJS = require('crypto-js');

@Component({
    selector: 'app-top-toolbar',
    templateUrl: './top-toolbar.component.html',
    animations: [
        trigger('show_profile_modal', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate(200, style({ opacity: 1 }))
            ]),
            transition(':leave', [
                style({ opacity: 1 }),
                animate(300, style({ opacity: 0 }))
            ])
        ])
    ]
})

export class TopToolbarComponent implements OnInit {

    public user: User = new User();
    public insertionsData: Array<any> = new Array<any>();

    public show_profile_modal = false;
    public show_alert_modal = false;

    constructor(public layoutService: CoreService,
        private authService: AuthService,
        private router: Router,
        private insertionService: InsertionService,
        private downloadService: DownloadService) {
    }

    ngOnInit() {
        this.user = this.authService.getAuth();
    }

    toggleProfileModal() {
        this.show_profile_modal = !this.show_profile_modal;
        this.show_alert_modal = false;
    }

    private dataAtual() {
        let data = new Date();
        let novaData = data.getDay() + '-' + (data.getMonth()+1)
            + '-' + data.getFullYear();
        return novaData;
    }

    downloadCategories() {
        //console.log(this.dataAtual());
        this.insertionService.downloadCategorias().subscribe((data) => {
            this.downloadService.run(data, this.dataAtual() + '-sts_mmm_categoria.xlsx');

        }, error => {
            if (error.status === 404) {
                return this.router.navigate(['/error/404']);
            }

            return new ErrorHandler(error).show();
        });
    }


}
