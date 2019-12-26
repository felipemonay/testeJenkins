import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'price'
})

export class PricePipe implements PipeTransform {
    private options: any = {
        minimumFractionDigits: 2,
        // style: 'currency',
        currency:              'BRL'
    };

    transform(value: number = 0): string {
        if (value) {
            return value.toLocaleString('pt-BR', this.options);
        } else {
            return '';
        }
    }
}
