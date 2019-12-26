import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InsertionListComponent} from './insertion-list/insertion-list.component';
import {InsertionCreateComponent} from './insertion-create/insertion-create.component';
import {InsertionUpdateComponent} from './insertion-update/insertion-update.component';
import {InsertionShowComponent} from './insertion-show/insertion-show.component';
import {InsertionForceUpdateComponent} from './insertion-force-update/insertion-force-update.component';

const routes: Routes = [
    {path: '', component: InsertionListComponent},
    {path: 'create', component: InsertionCreateComponent},
    {path: 'update', component: InsertionUpdateComponent},
    {path: 'force-update', component: InsertionForceUpdateComponent},
    {path: 'show', component: InsertionShowComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
