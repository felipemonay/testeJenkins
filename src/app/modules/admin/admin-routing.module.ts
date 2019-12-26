import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminAccessLevelComponent} from './components/admin-access-level/admin-access-level.component';


const routes: Routes = [
    {path: 'access-level', component: AdminAccessLevelComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
