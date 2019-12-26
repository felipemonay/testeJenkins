import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InsertionExtraOption} from '../models/insertion-extra-option';
import {IOption} from 'ng-select';


@Injectable(<any>{
    providedIn: 'root'
})

export class InsertionExtraOptionsService {
    @Output()
    public change: EventEmitter<boolean> = new EventEmitter();

    public constructor(private http: HttpClient) {
    }

    owners(data: any, id: number) {
        const url = '/insertions/' + id + '/extras/get_media_owner';
        return this.http.post<Array<InsertionExtraOption>>(url, data);
    }

    objectives() {
        const url = '/extra-options/objectives';
        return this.http.get<Array<InsertionExtraOption>>(url);
    }

    adservers(data: any, id: number) {
        const url = '/insertions/' + id + '/extras/get_adserver';
        return this.http.post<Array<InsertionExtraOption>>(url, data);
    }

    customers() {
        const url = '/extra-options/customers';
        return this.http.get<Array<InsertionExtraOption>>(url);
    }

    toOptions(data: Array<InsertionExtraOption>): Array<IOption> {

        const options: Array<IOption> = [];
        for (let i in data) {
            options.push({
                label: data[i].name,
                value: data[i].name
            });
        }
        return options;
    }

    changing() {
        this.change.emit(true);
    }
}
