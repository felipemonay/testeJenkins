import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
    selector: '[specialIsAlphaNumeric]'
})

export class SpecialCharacterDirective {
    @Input() isAlphaNumeric: boolean;
    private regexStr = '^[0-9;]*$';

    constructor(private el: ElementRef) {
    }

    @HostListener('keypress', ['$event']) onKeyPress(event) {
        return new RegExp(this.regexStr).test(event.key);
    }

    @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
        this.validateFields(event);
    }

    validateFields(event) {
        setTimeout(() => {
            this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^0-9;]/g, '')
                                              .replace(/;+/g, ' ').trim().replace(/\s+/g, ';');
        }, 100);
    }
}
