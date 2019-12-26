import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

declare var document: any;

@Injectable()

export class APIInterceptor implements HttpInterceptor {
    // readonly ROOT_API_URL = 'https://api-sts.midia.zone/api';
    readonly ROOT_API_URL = document.ROOT_API_URL;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.handlerRequest(request));
    }

    private handlerRequest(request: HttpRequest<any>) {

        const token = localStorage.getItem('token');
        let api_request;

        if (token) {
            api_request = request.clone({
                url:     this.ROOT_API_URL + request.url,
                headers: request.headers.set('token', token)
            });
        } else {
            api_request = request.clone({url: this.ROOT_API_URL + request.url});
        }

        return request.clone(api_request);
    }
}
