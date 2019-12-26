import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'substr'
})

export class SubstrPipe implements PipeTransform {
    transform(value: string, from: number = 0, length: number = 60): string {
        const word = value.substr(from, length);
        const prefix = from === 0 ? '' : '...';
        const suffix = value.length <= length ? '' : '...';
        return prefix + word + suffix;
    }
}
