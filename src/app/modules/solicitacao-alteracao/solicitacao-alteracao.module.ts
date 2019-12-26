import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SolicitacaoAlteracaoRoutingModule } from './solicitacao-alteracao-routing.module';
import { SolicitacaoAlteracaoComponent } from './solicitacao-alteracao.component';
import { AdTableModule } from './components/ad-table/ad-table.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SolicitacaoAlteracaoComponent],
  imports: [
    CommonModule,
    AdTableModule,
    FormsModule,
    SolicitacaoAlteracaoRoutingModule,
  ]
})
export class SolicitacaoAlteracaoModule { }
