import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {routing} from './error-routing.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {InternalServerErrorComponent} from './internal-server-error/internal-server-error.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {OldVersionInsertionComponent} from './old-version-insertion/old-version-insertion.component';

@NgModule({
    imports:      [
        routing,
        CommonModule
    ],
    declarations: [
        NotFoundComponent,
        InternalServerErrorComponent,
        ForbiddenComponent,
        OldVersionInsertionComponent
    ]
})

export class ErrorModule {
}
