import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LayoutClassicComponent} from './layout/layout-classic/classic.component';
import {LayoutClearComponent} from './layout/layout-clear/clear.component';
import {CoreService} from './core.service';
import {LoaderComponent} from './layout/components/loader/loader.component';
import {SideMenuComponent} from './layout/components/side-menu/side-menu.component';
import {TopToolbarComponent} from './layout/components/top-toolbar/top-toolbar.component';
import {FooterComponent} from './layout/components/footer/footer.component';
import {LogoutComponent} from '../modules/auth/logout/logout.component';
import {TopToolbarAlertComponent} from './layout/components/top-toolbar/components/top-toolbar-alert.component';
import {AlertService} from './alert.service';

@NgModule({
    imports:      [
        CommonModule,
        RouterModule
    ],
    declarations: [
        LayoutClassicComponent,
        LayoutClearComponent,
        FooterComponent,
        LoaderComponent,
        SideMenuComponent,
        TopToolbarComponent,
        TopToolbarAlertComponent,
        LogoutComponent
    ],
    providers:    [
        CoreService,
        AlertService
    ]
})

export class CoreModule {
}
