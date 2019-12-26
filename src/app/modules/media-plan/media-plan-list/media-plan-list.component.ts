import { Component, OnInit } from '@angular/core';

import { Pagination } from './../../../shared/models/pagination';
import { MediaPlanService } from '../../../shared/services/media-plan.service';
import { ErrorHandler } from 'src/app/shared/http/responses/error-handler';

@Component({
  selector: 'app-media-plan-list',
  templateUrl: './media-plan-list.component.html'
})
export class MediaPlanListComponent implements OnInit {

  public mediaPlans: Pagination = new Pagination();

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

  constructor(private MediaPlanService: MediaPlanService) { }

  ngOnInit() {
    this.getMediaPlan();
  }

  getMediaPlan() {   

  }

  child(initiative) {
    this.initiative = initiative;
  }

  onSubmit(){
    //console.log(this.initiativeFilter);
    this.MediaPlanService.paginate(this.page, this.search, this.sort, this.initiativeFilter).subscribe(data => {
      this.mediaPlans = data;
    }, error => {
      return new ErrorHandler(error).show();
    });
  }

  filter(event){
    this.initiativeFilter = event;
  }
}
