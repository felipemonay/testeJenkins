import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdService } from './ad.service';
import { ErrorHandler } from 'src/app/shared/http/responses/error-handler';
import { SuccessHandler } from 'src/app/shared/http/responses/success-handler';
import { CoreService } from 'src/app/core/core.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-solicitacao-alteracao',
  templateUrl: './solicitacao-alteracao.component.html'
})
export class SolicitacaoAlteracaoComponent implements OnInit, OnDestroy {

  public numeroPi: number;
  public dataTable: any;
  public emptyTable: boolean;

  constructor(private adService: AdService,
    private loader: CoreService) { }

  ngOnInit() {
    this.emptyTable = false;
  }

  ngOnDestroy(): void {
    this.dataTable = undefined;
  }


  search() {
    this.loader.setLoader(true);
    this.emptyTable = false;
    this.dataTable = undefined;
    this.adService.getAd(this.numeroPi).subscribe(data => {
      this.dataTable = data;
      this.loader.setLoader(false);
      if (this.dataTable.data.length === 0) {
        this.emptyTable = true
      }
    }, error => {
      this.loader.setLoader(false);
      return new ErrorHandler(error).show();
    })
  }


  private saveTable() {
    const ad = {
      pi: this.numeroPi,
      data: this.dataTable.data
    }
    this.loader.setLoader(true);
    this.emptyTable = false;
    this.dataTable = undefined;
    this.adService.storeAd(ad).subscribe(data => {
      this.loader.setLoader(false);
      this.search();
      return new SuccessHandler('Alterações realizadas com sucesso.').show();
    }, error => {
      this.loader.setLoader(false);
      return new ErrorHandler(error).show();
    });
  }

  confirm() {
    const self = this;
    swal.fire({
      title: 'Alerta!',
      text: 'Deseja salvar a alteração do AD pertencente ao PI ' + self.numeroPi + ' ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, continuar!',
      cancelButtonText: 'Não, cancelar!'
    }).then((response: any) => {
      if (!response.dismiss) {
        self.saveTable();
      }
    });
  }
}
