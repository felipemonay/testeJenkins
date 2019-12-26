import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AreaMedia} from '../../models/redshift/area-media';
import {IOption} from 'ng-select';
import {Insertion} from '../../models/insertion';

@Injectable(<any>{
    providedIn: 'root'
})

export class AreaMediaService {
    public constructor(private http: HttpClient) {
    }

    areas() {
        const url = '/redshift/areas';
        return this.http.get<Array<AreaMedia>>(url);
    }

    medias(area: string) {
        const url = '/redshift/areas/' + area;
        return this.http.get<Array<AreaMedia>>(url);
    }

    change(insertion: Insertion, media: string) {
        const url = '/redshift/change-media/' + media;

        return this.http.post<boolean>(url, insertion);
    }

    changeArea(insertion: Insertion, area: string) {
        const url = '/redshift/change-area/' + area;

        return this.http.post<boolean>(url, insertion);
    }

    toOptions(data: Array<AreaMedia>): Array<IOption> {
        let options: Array<IOption> = [];

        for (let i in data) {
            if (data[i].area) {
                options.push({
                    label: data[i].area,
                    value: data[i].area
                });
            } else {
                options.push({
                    label: data[i].midia,
                    value: data[i].midia
                });
            }
        }

        return options;
    }
}
