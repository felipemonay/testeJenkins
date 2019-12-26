import {Injectable} from '@angular/core';
// import { BaseService } from 'src/app/shared/services/base/base.service';
// import { User } from 'src/app/shared/models/user';
import {AccessLevel} from 'src/app/shared/models/access-level';
import {IOption} from 'ng-select';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AdminService /*extends BaseService<User>*/ {

    constructor(private httpClient: HttpClient) {
    }

    /* getContext() {
      return '/admin/access-levels';
    } */

    getMedias(idGroup: number, idCompany: number) {
        // const path = [idGroup.toString(), idCompany.toString()];
        // return this.get({afterPaths: path});
        return this.httpClient.get('/admin/access-levels/' + idGroup + '/' + idCompany);
    }

    toOptions(data: Array<AccessLevel>): Array<IOption> {
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
