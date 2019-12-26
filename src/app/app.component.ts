import {Component} from '@angular/core';
import {MediaModuleService} from './shared/services/media-module.service';

@Component({
    selector:    'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent {
    constructor(private mediaModule: MediaModuleService) {

    }
}
