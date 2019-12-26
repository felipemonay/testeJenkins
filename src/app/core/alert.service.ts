import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

declare var $: any;

@Injectable(<any>{
    providedIn: 'root'
})

export class AlertService {

    public alert: Observable<any>;
    private _alert: Subject<any>;

    constructor() {
        this._alert = new Subject<any>();
        this.alert = this._alert.asObservable();
    }

    callAlert() {
        // const test1 = new RegExp(/^\/insertions\?/);
        // const test2 = new RegExp(/^\/insertions\/[0-9]+$/);
        // const test3 = new RegExp(/^\/insertions\/[0-9]+\/groups\/[0-9]+\/digital$/);
        //
        // if (test1.test(request.url) || test2.test(request.url) || test3.test(request.url)) {

        this._alert.next();
        // }
    }

}
