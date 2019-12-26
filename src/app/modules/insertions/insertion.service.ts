import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Insertion } from '../../shared/models/insertion';
import { Pagination } from '../../shared/models/pagination';
import { AlertService } from '../../core/alert.service';


declare var require: any;
const httpBuildQuery = require('http-build-query');

@Injectable(<any>{
    providedIn: 'root'
})

export class InsertionService {
    @Output()
    public change: EventEmitter<string> = new EventEmitter();

    public constructor(private http: HttpClient, private alertService: AlertService) {
    }

    find(id) {
        this.alertService.callAlert();
        const url = '/insertions/' + id;

        return this.http.get<Insertion>(url);
    }


    downloadExcel(ids: Array<any>) {

        const url = '/insertions/export';

        return this.http.post(url, { ids: ids }, { responseType: 'blob' });


    }

    downloadCategorias() {

        const url = '/redshift/categories-mmm/export';

        return this.http.get(url, { responseType: 'blob' });


    }


    all(page = 1, search: any, sort: any) {
        const url = '/insertions?page=' + page + '&' + httpBuildQuery({ search: search }) + '&' + httpBuildQuery({ sort: sort });

        return this.http.get<Pagination>(url);
    }

    create(insertion: Insertion) {
        const url = '/insertions';
        insertion.extra = null;
        return this.http.post<Insertion>(url, insertion);
    }

    forceCreate(insertion: Insertion) {
        const url = '/insertions/force';
        insertion.extra = null;
        return this.http.post<Insertion>(url, insertion);
    }

    update(insertion: Insertion) {
        const url = '/insertions/' + insertion.id;

        return this.http.put(url, insertion);
    }

    clearDigital(insertion: Insertion) {
        const url = '/insertions/' + insertion.id + '/clear-digital';

        return this.http.post(url, insertion);
    }

    forceUpdate(insertion: Insertion) {
        const url = '/insertions/force/' + insertion.id;

        return this.http.put(url, insertion);
    }

    forceClearDigital(insertion: Insertion) {
        const url = '/insertions/force/' + insertion.id + '/clear-digital';

        return this.http.post(url, insertion);
    }

    destroy(insertion: Insertion) {
        const url = '/insertions/' + insertion.id;

        return this.http.delete(url);
    }

    duplicate(insertion: Insertion) {
        const url = '/insertions/' + insertion.id + '/duplicate';

        return this.http.post(url, insertion);
    }

    generateHash(insertion: Insertion) {
        const url = '/insertions/' + insertion.id + '/generate-hash';

        return this.http.post(url, {});
    }

    canGenerateHash(insertion: Insertion, withCompanyValidation = 1) {
        const url = '/insertions/can-generate-hash/' + insertion.id + '/' + withCompanyValidation.toString();

        return this.http.get(url);
    }

    generateHashWithNotification(insertion: Insertion) {
        const url = '/insertions/' + insertion.id + '/generate-hash-with-notification';

        return this.http.post(url, insertion);
    }

    newCanGenerateHash(insertion: Insertion, withCompanyValidation = 1){
        const url = '/insertions/can-generate-new-hash/' + insertion.id + '/' + withCompanyValidation.toString();

        return this.http.get(url);
    }

    newGenerateHash(insertion: Insertion){
        const url = '/insertions/' + insertion.id + '/generate-new-hash';

        return this.http.post(url, insertion);
    }

    handlesPiNumbers(insertion: Insertion) {
        const url = '/insertions/handles-pi-number';

        return this.http.post(url, insertion);
    }

    isEditable(insertion: Insertion) {
        const url = '/insertions/is-editable/' + insertion.id;

        return this.http.get(url);
    }

    changing(field: string) {
        this.change.emit(field);
    }

    sendPredicta(insertion: Insertion) {
        const url = '/insertions/send-predicta/' + insertion.id;

        return this.http.post(url, insertion);
    }

    digitalStatus(insertion: Insertion) {
        const url = '/insertions/' + insertion.id + '/digital-status';

        return this.http.get(url);
    }

    utmCount(insertion: Insertion) {
        const url = '/insertions/' + insertion.id + '/count-utm-real-time';
        return this.http.post(url, insertion);
    }

    getIdBloqueio(){
        return this.http.get('/bloqueio_chave');
    }
}
