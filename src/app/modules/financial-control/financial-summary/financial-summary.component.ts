import { Component, OnInit } from '@angular/core';

import { Pagination } from './../../../shared/models/pagination';
import { FinancialControlService } from '../../../shared/services/financial-control.service';
import { ErrorHandler } from 'src/app/shared/http/responses/error-handler';

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.component.html'
})
export class FinancialSummaryComponent implements OnInit {

  public financialSummarys: Pagination = new Pagination();

  page: number = 1;

  public label: string = 'Iniciativa';

  public initiative: string = '';

  public initiativeFilter: number;

  public search = {
    id: '',
    action_id: '',
    company_id: '',
    uniorg: '',
    n_conta_contabil: '',
    n_pedido: '',
    id_pre_faturamento: '',
    marca: '',
    produto: '',
    mercado: '',
    meio: '',
    veiculo: '',
    n_ap: '',
    n_pi: '',
    valor_liq: '',
    periodo_veiculacao: '',
    n_note_fiscal: '',
    emissao_nf: '',
    vencimento: '',
    obs_pi: '',
  };
  public sort: any = {
    column: '',
    direction: ''
  };

  constructor(private FinancialControlService: FinancialControlService) { }

  ngOnInit() {
    
  }

  child(initiative) {
    this.initiative = initiative;
  }

  onSubmit() {
    this.FinancialControlService.paginateFinancialSummary(this.page, this.search, this.sort, this.initiativeFilter).subscribe(data => {
      this.financialSummarys = data;
    }, error => {
      return new ErrorHandler(error).show();
    });
  }

  paginate(event){
    this.FinancialControlService.paginateFinancialSummary(event, this.search, this.sort, this.initiativeFilter).subscribe(data => {
      this.financialSummarys = data;
    }, error => {
      return new ErrorHandler(error).show();
    });
  }

  filter(event) {
    this.initiativeFilter = event;
  }


}
  



