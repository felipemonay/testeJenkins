import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactCreateComponent} from './contact-create/contact-create.component';

const routes: Routes = [
    {path: 'create', component: ContactCreateComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
