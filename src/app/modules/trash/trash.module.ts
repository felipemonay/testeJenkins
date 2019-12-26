import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { InsertionTrashListComponent } from './insertions/insertion-trash-list/insertion-trash-list.component';
import { InsertionTrashShowComponent } from './insertions/insertion-trash-show/insertion-trash-show.component';
import { routing } from './trash-routing.module';
import { UserTrashListComponent } from './users/user-trash-list/user-trash-list.component';
import { UserTrashShowComponent } from './users/user-trash-show/user-trash-show.component';
import { SelectModule } from 'ng-select';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    imports:      [
        routing,
        CommonModule,
        SharedModule,
        FormsModule,
        SelectModule,
        NgxMaskModule.forRoot()
    ],
    declarations: [InsertionTrashListComponent, InsertionTrashShowComponent, UserTrashShowComponent, UserTrashListComponent]
})

export class TrashModule {
}
