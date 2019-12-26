import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Insertion} from '../../../../shared/models/insertion';
import {Mrm} from '../../../../shared/models/mrm';

@Injectable(<any>{
    providedIn: 'root'
})

export class MrmService {
    public constructor(private http: HttpClient) {
    }

    all(insertion: Insertion) {
        const url = '/insertions/' + insertion.id + '/mrm';

        return this.http.get<Array<Mrm>>(url);
    }

    create(insertion: Insertion, mrm: Mrm) {
        const url = '/insertions/' + insertion.id + '/mrm';

        return this.http.post(url, mrm);
    }

    update(insertion: Insertion, mrm: Mrm) {
        const url = '/insertions/' + insertion.id + '/mrm/' + mrm.id;

        return this.http.put(url, mrm);
    }

    destroy(insertion: Insertion, mrm: Mrm) {
        const url = '/insertions/' + insertion.id + '/mrm/' + mrm.id;

        return this.http.delete(url);
    }
}
