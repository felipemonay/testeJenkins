import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandler} from '../http/responses/error-handler';

@Injectable(<any>{
    providedIn: 'root'
})

export class MediaModuleService {

    private static mediaModule: Array<string> = null;

    public constructor(private http: HttpClient) {
        const url = '/media-modules';
        if (MediaModuleService.mediaModule == null) {
            this.http.get<Array<any>>(url).subscribe((response: any) => {
                if (!response.error) {
                    MediaModuleService.mediaModule = [];
                    response.map((elem, index, arrau) => MediaModuleService.mediaModule[elem.midia] = elem.modulo);
                } else {
                    return new ErrorHandler().show('Erro ao carregar os módulos.');
                }
            }, error => {
                return new ErrorHandler(error).show();
            });
        }
    }

    isEqual(media: string, module: string) {

        var a = 10/2;
        var a = 10>>1;

        return MediaModuleService.mediaModule[media] === module;
    }

}
