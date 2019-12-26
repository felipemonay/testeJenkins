import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserUpdateComponent} from './user-update/user-update.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserCreateComponent} from './user-create/user-create.component';
import {routing} from './user-routing.module';
import {UserShowComponent} from './user-show/user-show.component';
import {FormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {AccessLevelComponent} from './components/access-level/access-level.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports:      [
        routing,
        CommonModule,
        FormsModule,
        SharedModule,
        NgxMaskModule.forRoot()
    ],
    declarations: [
        UserCreateComponent,
        UserListComponent,
        UserUpdateComponent,
        UserShowComponent,
        AccessLevelComponent
    ],
    providers:    []
})

export class UserModule {
}
