import {Component} from '@angular/core';
import {CoreService} from '../../../core.service';

@Component({
    selector:    'app-loader',
    templateUrl: './loader.component.html'
})

export class LoaderComponent {
    constructor(public layoutService: CoreService) {
    }
}
