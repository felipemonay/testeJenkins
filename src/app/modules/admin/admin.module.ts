import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminAccessLevelComponent} from './components/admin-access-level/admin-access-level.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {routing} from './admin-routing.module';
import {AdminService} from './admin.service';
import {CompanyService} from 'src/app/shared/services/company.service';
import {AccessLevelService} from 'src/app/shared/services/access-level.service';
import {SelectModule} from 'ng-select';

@NgModule({
    imports:      [
        CommonModule,
        SharedModule,
        routing,
        SelectModule
    ],
    declarations: [
        AdminAccessLevelComponent
    ],
    providers:    [
        AdminService,
        CompanyService,
        AccessLevelService
    ]
})
export class AdminModule {
}
