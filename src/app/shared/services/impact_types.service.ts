import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PiType} from '../models/pi-type';
import {IOption} from 'ng-select';

@Injectable({
    providedIn: 'root'
})

export class ImpactTypesService {
    public constructor(private http: HttpClient) {
    }

    all() {
        const url = '/impact_types';
        return this.http.get<Array<PiType>>(url);
    }

    toOptions(data: Array<PiType>): Array<IOption> {
        const options: Array<IOption> = [];

        for (const i in data) {
            if (data) {
                options.push({
                    label: data[i].name,
                    value: String(data[i].id)
                });
            }
        }

        return options;
    }
}
