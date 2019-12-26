import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaPlanListComponent } from './media-plan-list/media-plan-list.component';

const routes: Routes = [
  { path: 'list', component: MediaPlanListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaPlanRoutingModule { }
