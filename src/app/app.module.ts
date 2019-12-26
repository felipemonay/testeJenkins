import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RedirectIfAuthenticatedGuard} from './shared/middlewares/redirect-if-authenticated.guard';
import {RedirectIfNotAuthenticatedGuard} from './shared/middlewares/redirect-if-not-authenticated.guard';
import {APIInterceptor} from './shared/http/interceptors/api-interceptor';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports:      [
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        CoreModule,
        ToastrModule.forRoot({
            progressBar: true,
            enableHtml:  true
        })
    ],
    providers:    [
        RedirectIfAuthenticatedGuard,
        RedirectIfNotAuthenticatedGuard,
        {
            provide:  HTTP_INTERCEPTORS,
            useClass: APIInterceptor,
            multi:    true
        }
    ],
    bootstrap:    [AppComponent]
})

export class AppModule {
}
