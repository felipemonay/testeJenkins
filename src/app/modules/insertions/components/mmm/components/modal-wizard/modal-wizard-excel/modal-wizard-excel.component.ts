import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MmmService } from '../../../mmm.service';
import Handsontable from 'handsontable';
import { Insertion } from 'src/app/shared/models/insertion';
import { Group } from 'src/app/shared/models/group';
import { forkJoin } from 'rxjs';
import swal from 'sweetalert2';
import { ErrorHandler } from 'src/app/shared/http/responses/error-handler';
import { WizardCompletionStep, WizardComponent } from 'angular-archwizard';




@Component({
  selector: 'app-modal-wizard-excel',
  templateUrl: './modal-wizard-excel.component.html',
  styleUrls: ['./modal-wizard-excel.component.scss']
})
export class ModalWizardExcelComponent implements OnInit {

  private canSubmit = true;
  alert = false;

  @Input()
  public hotInstance: Handsontable;

  @Input()
  public insertion: Insertion = new Insertion();

  @Input()
  public group: Group = new Group();

  @Output()
  public doClose: EventEmitter<any> = new EventEmitter();

  @ViewChild(WizardComponent, { static: true })
  public wizard: WizardComponent;
  _show = true;

  constructor(
    private mmmService: MmmService,
  ) { }

  ngOnInit() {    
    if (!this.canSubmit) {
      return;
    }
    const countChanged = this.hotInstance.getData().reduce((prev, elem, index, array) => {
        if (elem[0] != null && elem[0] !== '') {
            return ++prev;
        }
        return prev;
    }, 0);

    const data = this.hotInstance.getSourceData().filter((value, indice) => {
        return value['channel'] != null && value['channel'] !== undefined && value['channel'] !== '';
    });
    if (this.validateWordOnCells(data)) {
        swal.fire('Atenção', 'Os campos linha criativa e segmentação não podem conter "cc-" ', 'error');
        return;
    }
    forkJoin([
        this.mmmService.checkUtm(this.insertion, this.group, data),
        this.mmmService.checkCPSP(this.insertion, this.group, data),
        this.mmmService.checkStringLimits(this.insertion, this.group, data)
    ]).subscribe(responseList => {
        let utmText = '';
        let cpspText = '';

        let limitCampaignText = '';
        let limitAdGroupText = '';
        let limitAdText = '';


        const utmList: Array<number> = (responseList[0].constructor === Array) ? responseList[0] as Array<number> : [];
        const cpspList: Array<number> = (responseList[1].constructor === Array) ? responseList[1] as Array<number> : [];
        const checkStringList: any = responseList[2];


        const swalDelayed = (utmList.length + cpspList.length) > 1 ? 1.8 : 0;

        if (utmList.length > 0) {
            utmText = '<br><strong><i class="fa fa-warning " style="color:#ff8c00" ></i> ' +
                'Linhas com mais de 100 caracteres nas UTMs: </strong>' + utmList.toString();
        }
        if (cpspList.length > 0) {
            cpspText = '<br> <i class="fa fa-warning " style="color:#ff8c00" ></i> ' +
                '<strong>Linhas sem correlação de CP/SP: </strong>' + cpspList.toString();
        }

        if (checkStringList.limit_campaign.length > 0) {
            limitCampaignText = '<br> <i class="fa fa-warning " style="color:#ff8c00" ></i> ' +
                '<strong>Linhas com mais de 128 caracteres na campanha (plataforma): </strong>' +
                checkStringList.limit_campaign.toString();
        }

        if (checkStringList.limit_ad_group.length > 0) {
            limitAdGroupText = '<br> <i class="fa fa-warning " style="color:#ff8c00" ></i> ' +
                '<strong>Linhas com mais de 255 caracteres no conjunto de anúncios (plataforma): </strong>' +
                checkStringList.limit_ad_group.toString();
        }

        if (checkStringList.limit_ad.length > 0) {
            limitAdText = '<br> <i class="fa fa-warning " style="color:#ff8c00" ></i> ' +
                '<strong>Linhas com mais de 255 caracteres no anúncio (plataforma): </strong>' +
                checkStringList.limit_ad.toString();
        }
        this.alert = true;
        this.wizard.goToNextStep();

    }, error => {
        this.canSubmit = true;
        return new ErrorHandler(error).show();
    });
    return;
  }

  createOrUpdate() {
    this.alert = false;
    this.canSubmit = false;

    const data = this.hotInstance.getSourceData().filter((value, indice) => {
        return value['channel'] != null && value['channel'] !== undefined && value['channel'] !== '';
    });
    this.mmmService.createOrUpdateDigital(this.insertion, this.group, data).subscribe(() => {
        this.canSubmit = true;
        
        this.wizard.goToNextStep();
    }, error => {
        this.canSubmit = true;
        return new ErrorHandler(error).show();
    });
  };

  private validateWordOnCells(data): boolean {
    return data.find(cell => (cell.segmentation.match(/cc-/ig) || cell.creative_line.match(/cc-/ig)));
  }

  close(salvar :boolean) {
    this.doClose.emit(salvar);
  };
}
