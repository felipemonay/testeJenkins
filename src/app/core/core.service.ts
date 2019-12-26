import {Injectable} from '@angular/core';
import {ActivationEnd, Event, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import * as mdc from 'material-components-web';

declare var $: any;

@Injectable(<any>{
    providedIn: 'root'
})

export class CoreService {
    public menu: boolean = true;
    private loaderStatus$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private router: Router, private http: HttpClient) {
        mdc.autoInit();

        router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart || event instanceof ActivationEnd) {
                this.setLoader(true);
            }

            if (event instanceof NavigationEnd) {
                this.reload();

                const self = this;

                setTimeout(function () {
                    self.setLoader(false);
                }, 1000);
            }
        });
    }

    setLoader(status: boolean): void {
        this.loaderStatus$.next(status);
    }

    getLoader(): Observable<boolean> {
        return this.loaderStatus$.asObservable();
    }

    reload(): void {
        this.reloadInputs();
        this.reloadSelects();
        this.reloadTooltips();
    }

    reloadTooltips(): void {
        $('[data-toggle="tooltip"]').tooltip();
    }

    reloadInputs(): void {
        const text_field = document.querySelectorAll('.mdc-text-field');
        for (let i = 0; i < text_field.length; i++) {
            new mdc.textField.MDCTextField(text_field[i]);
        }
    }

    reloadSelects(): void {
        const select_field = document.querySelectorAll('.mdc-select');

        for (let i = 0; i < select_field.length; i++) {
            new mdc.select.MDCSelect(select_field[i]);
        }
    }

    toggleMenu() {
        this.menu = !this.menu;
    }

    getApiVersion() {
        const url = '/version';
        return this.http.get<string>(url);
    }

    getAlert() {
        const url = '/insertions/status';
        return this.http.get(url);
    }
}
