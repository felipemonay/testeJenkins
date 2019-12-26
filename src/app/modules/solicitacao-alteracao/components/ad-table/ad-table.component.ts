import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import Handsontable from 'handsontable';
import { AreaMediaService } from 'src/app/shared/services/redshift/area-media.service';
import '../../../../../../node_modules/handsontable/languages/pt-BR';

@Component({
  selector: 'app-ad-table',
  templateUrl: './ad-table.component.html'
})
export class AdTableComponent implements OnInit, OnDestroy {

  @Input() dadosAdPi;
  public table: Handsontable;
  public mediaTypes: Array<string>;

  constructor(private areaMediaService: AreaMediaService) { }

  ngOnInit() {
    this.getMedias().then(() => {
      this.createTable();
    });
  }

  ngOnDestroy(): void {
    this.table.destroy();
  }


  private getOptions(data: Array<any>): Array<string> {
    let options: Array<string> = [];
    data.forEach(data => {
      options.push(data.midia);
    })
    return options;
  }

  public getMedias(): Promise<any> {
    let promessa = new Promise((resolve) => {
      const area = 'COMUNICACAO-EXTERNA-IMPRENSA';
      this.areaMediaService.medias(area).subscribe(data => {
        this.mediaTypes = this.getOptions(data);
        resolve();
      });
    })
    return promessa;
  }

  public createTable() {
    var elemento = document.getElementById('tabela')
    this.table = new Handsontable(elemento, {
      language: 'pt-BR',
      data: this.dadosAdPi.data,
      height: '400',
      width: '100%',
      columnSorting: true,
      invalidCellClassName: 'none',
      stretchH: 'all',
      preventOverflow: 'horizontal',
      className: 'hot mg-10--top text-sm-left',
      licenseKey: 'non-commercial-and-evaluation',
      afterChange: (changes, src) => {
        if (changes && !src.match('dateValidator')) {
          changes.forEach(([row, col, oldValue, newValue]) => {
            if (col == 'ds_meio') {
              this.dadosAdPi.data.forEach(linha => {
                linha.ds_meio = newValue;
              });
            }
            this.table.loadData(this.dadosAdPi.data);
          });
        }
      },
      columns: [
        {
          data: 'recordid',
          title: 'ID',
          readOnly: true
        },
        {
          data: 'nr_pi',
          title: 'PI',
          readOnly: true
        },
        {
          data: 'periodo_veiculacao',
          title: 'PERÍODO VEICULAÇÃO',
          readOnly: true,
          className: 'text--center'
        },
        {
          data: 'ds_meio',
          title: 'MEIO',
          type: 'dropdown',
          source: this.mediaTypes
        },
        {
          data: 'ds_veiculo',
          title: 'VEÍCULO',
          readOnly: true,
          className: 'text--center'
        },
        {
          data: 'ds_programa',
          title: 'PROGRAMAÇÃO',
          className: 'text--center'
        },
        {
          data: 'ds_titulo',
          title: 'TÍTULO'
        },
        {
          data: "data_insercao",
          title: 'DATA DA INSERÇÃO',
          className: 'text--center',
          type: 'date',
          correctFormat: true,
          dateFormat: 'YYYY-MM-DD'
        },
        {
          data: 'mnemonico_programa',
          title: 'MNEMONICO',
          className: 'text--center'
        },
        {
          data: 'vlr_liquido',
          title: 'PREÇO TOTAL',
          className: 'text--center',
          type: 'numeric',
          numericFormat: {
            pattern: '0,00',
            culture: 'pt-BR'
          }
        },
      ],
    });
    this.table.validateCells();
    this.table.render();
  }
}
