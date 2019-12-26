import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IOption} from 'ng-select';

@Injectable(<any>{
    providedIn: 'root'
})

export class CategoryMmmService {
    public constructor(private http: HttpClient) {
    }

    categories(data: any) {
        const url = '/redshift/categories-mmm';

        let post = [];

        for (let i in data) {
            post.push(data[i].value);
        }

        return this.http.post<any>(url, {selection: post});
    }

    categoriesWaterfall(data: Array<any>) {
        const url = '/redshift/categories-mmm/waterfall';

        return this.http.post<Array<any>>(url, {selection: data});
    }

    toOptions(data: any): Array<IOption> {
        let options: Array<IOption> = [];

        for (let i in data.options) {
            options.push({
                label: data.options[i],
                value: data.options[i]
            });
        }

        return options;
    }
}
