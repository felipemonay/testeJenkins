import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExtraService} from '../../../extra.service';

@Component({
    selector:    'app-modal-attention',
    templateUrl: './modal-attention.component.html'
})
export class ModalAttentionComponent implements OnInit {

    @Input()
    public show = false;

    @Output()
    public doClose: EventEmitter<any> = new EventEmitter();

    cpData = [];

    spData = [];

    options = ['cp', 'sp'];

    constructor(private extraService: ExtraService) {
    }

    ngOnInit() {
        this.extraService.getExtraOptions(this.options).subscribe((data: any) => {
            const cp = data[0];
            const sp = data[1];

            Object.keys(cp).forEach(key => {
                this.cpData.push({id: key, name: cp[key], index: parseInt(key, 10)});
            });
            this.cpData.sort((a, b) => a.index > b.index ? 1 : -1);

            Object.keys(sp).forEach(key => {
                this.spData.push({id: key, name: sp[key], index: parseInt(sp[key], 10)});
            });
            this.spData.sort((a, b) => a.index > b.index ? 1 : -1);
        });

    }

    close() {
        this.doClose.emit(true);
    }
}
