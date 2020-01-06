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
            {path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)}
        ]
    },
    {
        path:        'profile',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)}
        ]
    },
    {
        path:        'users',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: () => import('./modules/users/user.module').then(m => m.UserModule)}
        ]
    },
    {
        path:        'insertions',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: () => import('./modules/insertions/insertion.module').then(m => m.InsertionModule)}
        ]
    },
    {
        path:        'contacts',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: () => import('./modules/contacts/contact.module').then(m => m.ContactModule)}
        ]
    },
    {
        path:        'fluxo-manutencao',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: () => import('./modules/fluxo-manutencao/fluxo-manutencao.module').then(m => m.FluxoManutencaoModule)}
        ]
    },
    {
        path:        'solicitacao-alteracao',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: () => import('./modules/solicitacao-alteracao/solicitacao-alteracao.module').then(m => m.SolicitacaoAlteracaoModule)}
        ]
    },
    {
        path:        'auth',
        data:        {base: true},
        component:   LayoutClearComponent,
        canActivate: [RedirectIfAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)}
        ]
    },
    {
        path:        'financial-control',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: () => import('./modules/financial-control/financial-control.module').then(m => m.FinancialControlModule)}
        ]
    },
    {
        path:        'media-plan',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: () => import('./modules/media-plan/media-plan.module').then(m => m.MediaPlanModule)}
        ]
    },
    {
        path:        'resumo-midia',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        loadChildren: () => import('./modules/resumo-media/resumo-media.module').then(m => m.ResumoMediaModule)
       
    },
    {
        path:        'activity-history',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: () => import('./modules/get-log/get-log.module').then(m => m.GetLogModule)}
        ]
    },
    {
        path:        'trash',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: () => import('./modules/trash/trash.module').then(m => m.TrashModule)}
        ]
    },
    {
        path:        'admin',
        data:        {base: true},
        component:   LayoutClassicComponent,
        canActivate: [RedirectIfNotAuthenticatedGuard],
        children:    [
            {path: '', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)}
        ]
    },
    {
        path: 'error', data: {base: true}, component: LayoutClearComponent, children: [
            {path: '', loadChildren: () => import('./modules/errors/error.module').then(m => m.ErrorModule)}
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
