import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './not-found/not-found.component';
import {InternalServerErrorComponent} from './internal-server-error/internal-server-error.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {OldVersionInsertionComponent} from './old-version-insertion/old-version-insertion.component';

const routes: Routes = [
    {path: '403', component: ForbiddenComponent},
    {path: '404', component: NotFoundComponent},
    {path: '500', component: InternalServerErrorComponent},
    {path: 'old-version', component: OldVersionInsertionComponent}
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
