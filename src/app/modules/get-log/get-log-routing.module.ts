import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetLogComponent } from './get-log.component';

const routes: Routes = [
  { path: '', component: GetLogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetLogRoutingModule { }
