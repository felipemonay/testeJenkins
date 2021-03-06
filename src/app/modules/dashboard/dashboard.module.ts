import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {routing} from './dashboard-routing.module';

@NgModule({
    imports:      [
        routing,
        CommonModule
    ],
    declarations: [
        DashboardComponent
    ]
})

export class DashboardModule {
}
