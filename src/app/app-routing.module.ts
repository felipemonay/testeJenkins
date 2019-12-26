import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LayoutClassicComponent} from './core/layout/layout-classic/classic.component';
import {LayoutClearComponent} from './core/layout/layout-clear/clear.component';
import {RedirectIfNotAuthenticatedGuard} from './shared/middlewares/redirect-if-not-authenticated.guard';
import {RedirectIfAuthenticatedGuard} from './shared/middlewares/redirect-if-authenticated.guard';

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'login', redirectTo: '/auth/login'},
    {
        path:        'dashboard',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: './modules/dashboard/dashboard.module#DashboardModule'}
        ]
    },
    {
        path:        'profile',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: './modules/profile/profile.module#ProfileModule'}
        ]
    },
    {
        path:        'users',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: './modules/users/user.module#UserModule'}
        ]
    },
    {
        path:        'insertions',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: './modules/insertions/insertion.module#InsertionModule'}
        ]
    },
    {
        path:        'contacts',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: './modules/contacts/contact.module#ContactModule'}
        ]
    },
    {
        path:        'fluxo-manutencao',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: './modules/fluxo-manutencao/fluxo-manutencao.module#FluxoManutencaoModule'}
        ]
    },
    {
        path:        'solicitacao-alteracao',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: './modules/solicitacao-alteracao/solicitacao-alteracao.module#SolicitacaoAlteracaoModule'}
        ]
    },
    {
        path:        'auth',
        data:        {base: true},
        component:   LayoutClearComponent,
        canActivate: [RedirectIfAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: './modules/auth/auth.module#AuthModule'}
        ]
    },
    {
        path:        'financial-control',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: './modules/financial-control/financial-control.module#FinancialControlModule'}
        ]
    },
    {
        path:        'media-plan',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: './modules/media-plan/media-plan.module#MediaPlanModule'}
        ]
    },
    {
        path:        'resumo-midia',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        loadChildren: './modules/resumo-media/resumo-media.module#ResumoMediaModule'
       
    },
    {
        path:        'activity-history',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: './modules/get-log/get-log.module#GetLogModule'}
        ]
    },
    {
        path:        'trash',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: './modules/trash/trash.module#TrashModule'}
        ]
    },
    {
        path:        'admin',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: './modules/admin/admin.module#AdminModule'}
        ]
    },
    {
        path: 'error', data: {base: true}, component: LayoutClearComponent, children: [
            {path: '', loadChildren: './modules/errors/error.module#ErrorModule'}
        ]
    },
    {path: '**', redirectTo: '/error/404'}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}
