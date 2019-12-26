import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Insertion} from '../../../../shared/models/insertion';
import {Group} from '../../../../shared/models/group';
import {Tag} from '../../../../shared/models/tag';
import {Extra} from '../../../../shared/models/extra';

@Injectable(<any>{
    providedIn: 'root'
})

export class MmmService {

    public isNewGroup:boolean;

    public constructor(private http: HttpClient) {
    }

    groups(insertion: Insertion) {
        const url = '/insertions/' + insertion.id + '/groups';

        return this.http.get<Array<Group>>(url);
    }

    create(insertion: Insertion, group: Group) {
        const url = '/insertions/' + insertion.id + '/groups';
        group.insertion_id = insertion.id;

        return this.http.post(url, group);
    }

    showExtra(insertion: Insertion) {
        const url = '/insertions/' + insertion.id + '/extras';

        return this.http.get<Extra>(url);
    }

    update(insertion: Insertion, group: Group) {
        const url = '/insertions/' + insertion.id + '/groups/' + group.id;
        group.insertion_id = insertion.id;
        return this.http.put(url, group);
    }

    destroy(insertion: Insertion, group: Group) {
        const url = '/insertions/' + insertion.id + '/groups/' + group.id;

        return this.http.delete(url);
    }

    createTag(insertion: Insertion, group: Group, tag: Tag) {
        const url = '/insertions/' + insertion.id + '/groups/' + group.id + '/tags';

        return this.http.post(url, tag);
    }

    updateTag(insertion: Insertion, group: Group, tag: Tag) {
        const url = '/insertions/' + insertion.id + '/groups/' + group.id + '/tags/' + tag.id;

        return this.http.put(url, tag);
    }

    destroyTag(insertion: Insertion, group: Group, tag: Tag) {
        const url = '/insertions/' + insertion.id + '/groups/' + group.id + '/tags/' + tag.id;

        return this.http.delete(url);
    }

    createOrUpdateDigital(insertion: Insertion, group: Group, data: Array<any>) {
        const url = '/insertions/' + insertion.id + '/groups/' + group.id + '/digital';

        return this.http.post(url, {data: data, insertion: insertion});
    }

    checkUtm(insertion: Insertion, group: Group, data: Array<any>) {
        const url = '/insertions/' + insertion.id + '/groups/' + group.id + '/digital/count-utm';

        return this.http.post(url, {data: data, insertion: insertion, group: group});
    }

    checkCPSP(insertion: Insertion, group: Group, data: Array<any>) {
        const url = '/insertions/' + insertion.id + '/groups/' + group.id + '/digital/check-cp-sp';

        return this.http.post(url, {data: data, insertion: insertion, group: group});
    }

    checkStringLimits(insertion: Insertion, group: Group, data: Array<any>) {
        const url = '/insertions/' + insertion.id + '/groups/' + group.id + '/digital/check-string-limits';

        return this.http.post(url, {data: data, insertion: insertion, group: group});
    }
}
