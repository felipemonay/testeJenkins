import {Injectable} from '@angular/core';

@Injectable(<any>{
    providedIn: 'root'
})

export class DownloadService {


    public constructor() {

    }


    public run(data: Blob, filename: string) {
        const blob = new Blob([data], {type: data.type});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.style.position = 'fixed';
        a.style.top = '0';
        a.style.left = '0';
        a.style.width = '2em';
        a.style.height = '2em';
        a.style.padding = '0';
        a.style.border = 'none';
        a.style.outline = 'none';
        a.style.boxShadow = 'none';
        a.style.background = 'transparent';
        document.body.appendChild(a);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }


}
