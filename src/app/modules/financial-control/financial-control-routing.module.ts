import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsolidationComponent } from './consolidation/consolidation.component';
import { FinancialSummaryComponent } from './financial-summary/financial-summary.component';


const routes: Routes = [
  { path: 'financial-summary', component: FinancialSummaryComponent },
  { path: 'consolidation', component: ConsolidationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialControlRoutingModule { }
