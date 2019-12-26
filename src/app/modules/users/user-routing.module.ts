import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UserCreateComponent} from './user-create/user-create.component';
import {UserUpdateComponent} from './user-update/user-update.component';
import {UserShowComponent} from './user-show/user-show.component';

const routes: Routes = [
    {path: '', component: UserListComponent},
    {path: 'create', component: UserCreateComponent},
    {path: 'update', component: UserUpdateComponent},
    {path: 'show', component: UserShowComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
