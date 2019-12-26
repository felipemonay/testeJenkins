import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from './components/pagination/pagination.component';
import {SortColumnComponent} from './components/sort-column/sort-column.component';
import {SubstrPipe} from './pipes/substr.pipe';
import {SubstrUntilPipe} from './pipes/substr-until.pipe';
import {SpecialCharacterDirective} from './directives/special-character.directive';
import {PricePipe} from './pipes/price.pipe';
import {DateFormatPipe} from './pipes/date-format.pipe';
import {CurrencyMaskConfig} from 'ngx-currency/src/currency-mask.config';
import {DoubleDirective} from './directives/double.directive';
import {ShowDefaultMmmComponent} from './components/show-mmm/show-default-mmm.component';
import {ShowModalExcelComponent} from './components/show-modal-excel/show-modal-excel.component';
import {ShowMrmComponent} from './components/show--mrm/show-mrm.component';


@NgModule({
    imports:      [
        CommonModule
    ],
    declarations: [
        SubstrPipe,
        SubstrUntilPipe,
        PricePipe,
        DateFormatPipe,
        SpecialCharacterDirective,
        DoubleDirective,
        PaginationComponent,
        SortColumnComponent,
        ShowDefaultMmmComponent,
        ShowModalExcelComponent,
        ShowMrmComponent
    ],
    exports:      [
        SubstrPipe,
        SubstrUntilPipe,
        PricePipe,
        DateFormatPipe,
        SpecialCharacterDirective,
        PaginationComponent,
        SortColumnComponent,
        ShowDefaultMmmComponent,
        ShowModalExcelComponent,
        ShowMrmComponent
    ]
})

export class SharedModule {
}

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align:         'left',
    allowNegative: true,
    allowZero:     true,
    decimal:       ',',
    precision:     2,
    prefix:        'R$ ',
    suffix:        '',
    thousands:     '.',
    nullable:      true
};
