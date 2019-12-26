import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FluxoManutencaoRoutingModule } from './fluxo-manutencao-routing.module';
import { FluxoManutencaoNovoComponent } from './fluxo-manutencao-novo/fluxo-manutencao-novo.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FluxoManutencaoNovoComponent],
  imports: [
    CommonModule,
    FormsModule,
    FluxoManutencaoRoutingModule
  ]
})
export class FluxoManutencaoModule { }
