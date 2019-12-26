import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PiType} from '../models/pi-type';
import {IOption} from 'ng-select';

@Injectable(<any>{
    providedIn: 'root'
})

export class PiTypeService {
    public constructor(private http: HttpClient) {
    }

    all() {
        const url = '/pi-types';
        return this.http.get<Array<PiType>>(url);
    }

    toOptions(data: Array<PiType>): Array<IOption> {
        let options: Array<IOption> = [];

        for (let i in data) {
            options.push({
                label: data[i].name,
                value: String(data[i].id)
            });
        }

        return options;
    }
}
