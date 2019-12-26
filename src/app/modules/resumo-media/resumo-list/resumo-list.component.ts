import { Component, OnInit, OnDestroy } from '@angular/core';

import * as Handsontable from 'handsontable';

@Component({
  selector: 'app-resumo-list',
  templateUrl: './resumo-list.component.html'
})
export class ResumoListComponent implements OnInit {

  settings = {
    data: [
      [ 'Cash', '','OUT OF HOME', 'ENTREGA AVULSA', '58.080,00', ''],
      [ 'Cash', '','OUT OF HOME', 'LEDWAVE', '18.979,20', ''],
      [ 'Cash', '','OUT OF HOME', 'BANDEIRANTES', '17.067,60', ''],
      [ 'Cash', '','OUT OF HOME', 'SINERGY', '35.428,00', ''],
      [ 'Cash', '','OUT OF HOME', 'LZ PAINEIS', '11.088,00', ''],
      [ 'Pacote', 'F1 Digital ','OUT OF HOME', 'REDE OUTLIGHT', '46.640,00', ''],
      [ 'Cash', '','OUT OF HOME', 'CLEAR (AVULSO)', '1.904,00', ''],
      [ 'Cash', '','OUT OF HOME', 'DIVERSAS', '144.330,00', ''],
      [ 'Cash', '','OUT OF HOME', 'YOUTUBE', '44.352,00', ''],
      [ 'Cash', '','RADIO', 'FACEBOOK / INSTAGRAM', '26.456,76', '']
    ],
    // colHeaders: ['MEIO', 'VEÍCULO', 'PROPRIEDADE', 'Pacote', 'Valor Total', 'Obs'],


    columns: [
      {
        title: 'PROPRIEDADE',
        className: 'text--center'
      },
      {
        title: 'Pacote',
        className: 'text--center'
      },

      {
        title: 'MEIO',
        className: 'text--center'
      },
      {
        title: 'VEÍCULO',
        className: 'text--center'
      },
      {
        title: 'VALOR',
        className: 'text--right'
      },
      {
        title: 'OBS',
        className: 'text--center'
      },
    ],
    
    colWidths: [150, 150, 300, 150, 200, 150, 200],
    height: '300',
    licenseKey: 'non-commercial-and-evaluation',

  }

  constructor(

  ) { }

  ngOnInit() {
  }



}
