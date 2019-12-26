import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FinancialControlRoutingModule } from './financial-control-routing.module';
import { FinancialSummaryComponent } from './financial-summary/financial-summary.component';
import { ConsolidationComponent } from './consolidation/consolidation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

import { IframeDesktopComponent } from './consolidation/components/iframe-desktop/iframe-desktop.component';
import { IframeMobileComponent } from './consolidation/components/iframe-mobile/iframe-mobile.component';
import { IframeTabletComponent } from './consolidation/components/iframe-tablet/iframe-tablet.component';
import { SelectModule } from 'ng-select';
import { SelectComponent } from './financial-summary/componentes/select/select.component';
import { ButtonSearchSummaryComponent } from './financial-summary/componentes/button-search/button-search-summary.component';

@NgModule({
  declarations: [FinancialSummaryComponent, ConsolidationComponent,
    IframeDesktopComponent, IframeMobileComponent, IframeTabletComponent, SelectComponent, ButtonSearchSummaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SelectModule,
    FinancialControlRoutingModule,
    SharedModule,
    NgxMaskModule.forRoot()
  ]
})
export class FinancialControlModule { }
