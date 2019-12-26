import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DigitalSourceTree} from '../../../../../../shared/models/digital-source-tree';
import {DigitalSources} from '../../../../../../shared/models/DigitalSources';
import {RuleMediaType} from 'src/app/shared/models/redshift/rule-media-type';

@Injectable({
    providedIn: 'root'
})

export class SourceService {



    public constructor(private http: HttpClient) {
    }



    all(ad_server: string = '') {
        if (ad_server === '') {
            ad_server = 'negociacao-direta';
        }
        const url = '/digital/sources/' + ad_server;
        return this.http.get<DigitalSources>(url);
    }

    // getChannel(data: any, insertionId: number) {
    //     const url = '/insertions/' + insertionId + '/groups/digital/get_canal';
    //     return this.http.post(url, data);
    // }
    //
    // getMediaType(data: any, insertionId: number) {
    //     const url = '/insertions/' + insertionId + '/groups/digital/get_media_type';
    //     return this.http.post(url, data);
    // }
    //
    // getFormat(data: any, insertionId: number) {
    //     const url = '/insertions/' + insertionId + '/groups/digital/get_format';
    //     return this.http.post(url, data);
    // }
    //
    // getDuration(data: any, insertionId: number) {
    //     const url = '/insertions/' + insertionId + '/groups/digital/get_duracao';
    //     return this.http.post(url, data);
    // }


    getTree(data) {
        // sts_mmm_digital/all', 'InsertionDigitalController@getAllMmm');
        const url = '/insertions/sts_mmm_digital/all';
        return this.http.post<Array<DigitalSourceTree>>(url, data);
    }

    getTimeFormat(media_type: string, formats: string) {
        const data = {
            media_type: media_type,
            formats: formats
        };
        const url = '/redshift/categories-mmm/rule_media_type_format';
        return this.http.post<RuleMediaType>(url, data);
    }

    getCorrespondenceValues(media_type: string) {
        const data = {
            media_type: media_type
        };
        const url = '/redshift/categories-mmm/rule_correspondence';
        return this.http.post<Array<string>>(url, data);
    }
}
