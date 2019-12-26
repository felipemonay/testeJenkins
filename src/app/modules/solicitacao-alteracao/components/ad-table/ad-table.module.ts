import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdTableComponent } from './ad-table.component';
import { FormsModule } from '@angular/forms';
import { HotTableModule } from '@handsontable/angular';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AdTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    HotTableModule.forRoot(),
  ],
  exports: [AdTableComponent]
})
export class AdTableModule { }
