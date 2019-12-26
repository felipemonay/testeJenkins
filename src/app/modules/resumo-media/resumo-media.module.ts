import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotTableModule } from '@handsontable/angular';


import { ResumoMediaRoutingModule } from './resumo-media-routing.module';
import { ResumoListComponent } from './resumo-list/resumo-list.component';
import { ResumoTableComponent } from './resumo-list/components/resumo-table/resumo-table.component';

@NgModule({
  declarations: [ResumoListComponent, ResumoTableComponent],
  imports: [
    CommonModule,
    ResumoMediaRoutingModule,
    HotTableModule.forRoot()

  ]
})
export class ResumoMediaModule { }
