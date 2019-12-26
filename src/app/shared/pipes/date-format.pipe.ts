import {Pipe, PipeTransform} from '@angular/core';

declare var require: any;
const dateFormat = require('dateformat');

@Pipe({
    name: 'dateFormat'
})

export class DateFormatPipe implements PipeTransform {
    transform(date: any, format: string = 'dd/mm/yyyy'): string {

        if (!date) return '';

        date = new Date(date.replace(/-/g, '/'));

        if (!date.getDate()) {
            return '';
        }

        return dateFormat(new Date(date), format);
    }
}
