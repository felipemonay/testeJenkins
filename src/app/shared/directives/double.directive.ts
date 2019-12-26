import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
    selector: '[double]'
})

export class DoubleDirective {
    private regex: string = '^[0-9]*\\.?[0-9]+$';

    constructor(private el: ElementRef) {
    }

    @HostListener('keypress', ['$event']) onKeyPress(event) {
        return new RegExp(this.regex).test(event.key);
    }

    @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
        this.validateFields(event);
    }

    validateFields(event) {
        setTimeout(() => {

            this.el.nativeElement.value = this.el.nativeElement.value.replace(/[\W_]+/g, ' ');
            event.preventDefault();

        }, 100);
    }
}
