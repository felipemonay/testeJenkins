import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitacaoAlteracaoComponent } from './solicitacao-alteracao.component';

const routes: Routes = [
  { path: '', component: SolicitacaoAlteracaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitacaoAlteracaoRoutingModule { }
