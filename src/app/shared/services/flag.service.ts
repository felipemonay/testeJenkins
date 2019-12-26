import {Injectable} from '@angular/core';
import {Flag} from '../models/flag';
import {HttpClient} from '@angular/common/http';
import {IOption} from 'ng-select';

@Injectable(<any>{
    providedIn: 'root'
})

export class FlagService {
    public constructor(private http: HttpClient) {
    }

    all() {
        const url = '/flags';
        return this.http.get<Array<Flag>>(url);
    }

    toOptions(data: Array<Flag>): Array<IOption> {
        let options: Array<IOption> = [];

        for (let i in data) {
            options.push({
                label: data[i].slug,
                value: String(data[i].id)
            });
        }

        return options;
    }
}
