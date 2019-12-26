import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FluxoManutencaoNovoComponent } from './fluxo-manutencao-novo/fluxo-manutencao-novo.component';

const routes: Routes = [
  { path: 'new', component: FluxoManutencaoNovoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FluxoManutencaoRoutingModule { }
