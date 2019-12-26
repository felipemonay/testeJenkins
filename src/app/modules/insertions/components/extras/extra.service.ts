import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Insertion} from '../../../../shared/models/insertion';
import {Extra} from '../../../../shared/models/extra';
import {forkJoin, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ExtraService {

    public constructor(private http: HttpClient) {
    }

    createOrUpdate(insertion: Insertion, extra: Extra, isAdmin: boolean = false) {
        const admin = isAdmin ? '/force' : '';

        const url = '/insertions/' + insertion.id + '/extras' + admin;

        if (extra) {
            extra.insertion_id = insertion.id;
        }
        // console.log(insertion,extra)
        if (extra) {
            return this.http.post(url, extra);

        } else {
            return new Observable((subscriber) => {
                subscriber.next(true);
                subscriber.complete();
            });
        }
    }

    getExtraOptions(options: Array<string>) {
        const url = '/extra-options/';
        return forkJoin(options.map((elem) => this.http.get(url + elem)));
    }
}
