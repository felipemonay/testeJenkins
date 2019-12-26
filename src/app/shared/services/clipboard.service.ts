import {Injectable} from '@angular/core';
import {ErrorHandler} from '../http/responses/error-handler';
import {SuccessHandler} from '../http/responses/success-handler';

@Injectable(<any>{
    providedIn: 'root'
})

export class ClipboardService {
    private textarea: any = document.createElement('textarea');

    private value: number | string = '';

    public constructor() {
        this.createStyle();
    }

    public copy(value: number | string) {
        this.value = value;
        this.run();
    }

    private run() {
        this.textarea.value = this.value;
        document.body.appendChild(this.textarea);
        this.textarea.select();

        try {
            document.execCommand('copy');
            new SuccessHandler('Texto copiado: ' + this.value).show().then();
        } catch (e) {
            new ErrorHandler().show('Erro ao copiar o texto.').then();
        }

        this.removeTextArea();
    }

    private createStyle() {
        this.textarea.style.position = 'fixed';
        this.textarea.style.top = '0';
        this.textarea.style.left = '0';
        this.textarea.style.width = '2em';
        this.textarea.style.height = '2em';
        this.textarea.style.padding = '0';
        this.textarea.style.border = 'none';
        this.textarea.style.outline = 'none';
        this.textarea.style.boxShadow = 'none';
        this.textarea.style.background = 'transparent';
    }

    private removeTextArea() {
        document.body.removeChild(this.textarea);
    }
}
