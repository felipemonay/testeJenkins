import {Injectable} from '@angular/core';
import {IOption} from 'ng-select';
import {ErrorHandler} from '../http/responses/error-handler';

@Injectable({
    providedIn: 'root'
})
export class SharedMethodsService {

    openErrorMessage(error: string) {
        return new ErrorHandler(error).show();
    }

    toOptions(data: Array<any>): Array<IOption> {
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
