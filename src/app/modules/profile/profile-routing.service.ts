import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
    {path: '', component: ProfileComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
