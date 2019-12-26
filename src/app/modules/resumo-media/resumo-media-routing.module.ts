import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumoListComponent } from './resumo-list/resumo-list.component'

const routes: Routes = [
  { path: '', component: ResumoListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumoMediaRoutingModule { }
