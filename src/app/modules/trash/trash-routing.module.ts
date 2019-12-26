import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InsertionTrashListComponent} from './insertions/insertion-trash-list/insertion-trash-list.component';
import {InsertionTrashShowComponent} from './insertions/insertion-trash-show/insertion-trash-show.component';
import {UserTrashListComponent} from './users/user-trash-list/user-trash-list.component';
import {UserTrashShowComponent} from './users/user-trash-show/user-trash-show.component';

const routes: Routes = [
    {path: 'users', component: UserTrashListComponent},
    {path: 'users/show', component: UserTrashShowComponent},
    {path: 'insertions', component: InsertionTrashListComponent},
    {path: 'insertions/show', component: InsertionTrashShowComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
