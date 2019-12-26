import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GetLogRoutingModule } from './get-log-routing.module';
import { GetLogComponent } from './get-log.component';
import { CompanySelectComponent } from './componentes/company-select/company-select.component';
import { ButtonSearchComponent } from './componentes/button-search/button-search.component';
import { EndDateComponent } from './componentes/end-date/end-date.component';
import { StartDateComponent } from './componentes/start-date/start-date.component';
import { InsertionComponent } from './componentes/insertion/insertion.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectModule } from 'ng-select';

@NgModule({
  declarations: [GetLogComponent, CompanySelectComponent, ButtonSearchComponent, EndDateComponent, StartDateComponent, InsertionComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    SelectModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    GetLogRoutingModule
  ]
})
export class GetLogModule { }
