import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'substrUntil'
})

export class SubstrUntilPipe implements PipeTransform {
    transform(value: string, until: string, suffix: string = ''): string {
        const word = value.substr(0, value.indexOf(until));
        return word + suffix;
    }
}
