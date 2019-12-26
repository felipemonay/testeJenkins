import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaPlanRoutingModule } from './media-plan-routing.module';
import { MediaPlanListComponent } from './media-plan-list/media-plan-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectModule } from 'ng-select';

@NgModule({
  declarations: [MediaPlanListComponent],
  imports: [
    CommonModule,
    FormsModule,
    SelectModule, 
    MediaPlanRoutingModule,
    SharedModule
  ]
})
export class MediaPlanModule { }
