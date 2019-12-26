import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Insertion } from 'src/app/shared/models/insertion';
import { InsertionService } from './insertion.service';

@Injectable({
  providedIn: 'root'
})
export class InsertionToastService {

  constructor(
    private toastr: ToastrService,
    private insertionService: InsertionService) { }

  updateToastr(insertion: Insertion) {
    this.insertionService.utmCount(insertion).subscribe(data => {
      let count;
      count = data;
      if (this.hasToastr()) {
        this.toastr.clear();
      }
      if (count !== undefined && count !== null && count > 0) {
        setTimeout(() => {
          this.toastr.warning(

            `<span>Utm_campaign: Limite excedido, recomendamos que diminua <strong> ${count} </strong> caracteres do nome da campanha</span>`,

            'Atenção!',
            {
              closeButton: true,
              positionClass: 'toast-bottom-left',
              enableHtml: true,
              disableTimeOut: true,
              tapToDismiss: false,
              progressBar: false,
              toastClass: 'toast-warning toast toast-class'
            });
        }, 500)
      }
    })

  }

  hasToastr() {
    if (document.getElementsByClassName('toast-class').length > 0) {
      return true;
    } else {
      return false;
    }
  }

}
