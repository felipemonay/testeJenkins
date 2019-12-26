import {Component} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {CoreService} from '../../../core.service';
import swal from 'sweetalert2';


declare var document: any;

@Component({
    selector:    'app-footer',
    templateUrl: './footer.component.html'
})

export class FooterComponent {
    public version: string = environment.VERSION;
    public api_version: string = '';
    public is_prod: boolean = true;
    public year;
    private api_url: string = document.ROOT_API_URL;

    constructor(private layoutService: CoreService) {
        if (this.api_url === 'http://sts.api/api' || this.api_url === 'http://127.0.0.1:8000/api' || this.api_url === 'http://homolog-sts-api.midia.zone/api') {
            this.is_prod = false;
        }
        this.year = new Date();

        layoutService.getApiVersion().subscribe((version: string) => {
            this.api_version = version;
        });
    }


    showVersion() {
        swal.fire({
            title: 'Versão',

            html:              '<div style="text-align: left">' +
                               '<strong>API URL: </strong>' + this.api_url + ' <br>' +
                               '<strong>SITE: </strong>' + this.version + ' <br>' +
                               '<strong>API: </strong>' + this.api_version + ' <br></div>',
            type:              'info',
            showCancelButton:  false,
            confirmButtonText: 'Continuar!'
            // cancelButtonText: 'Não, cancelar!'

        });

    }
}
