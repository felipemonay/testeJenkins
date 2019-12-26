import {Component, Input, OnInit} from '@angular/core';
import {Insertion} from '../../models/insertion';
import {ClipboardService} from '../../services/clipboard.service';
import {ErrorHandler} from '../../http/responses/error-handler';
import {InsertionService} from '../../../modules/insertions/insertion.service';
import {DownloadService} from '../../services/download.service';
import {Router} from '@angular/router';
import {Group} from '../../models/group';
import {MediaModuleService} from '../../services/media-module.service';

@Component({
    selector:    'app-show-mmm',
    templateUrl: './show-default-mmm.component.html'
})

export class ShowDefaultMmmComponent implements OnInit {
    @Input()
    public insertion: Insertion = new Insertion();

    public modal: any = {
        show:  false,
        group: new Group()
    };

    constructor(private clipboard: ClipboardService,
                private insertionService: InsertionService,
                private downloadService: DownloadService,
                private router: Router,
                public mediaModuleService: MediaModuleService) {
    }

    ngOnInit() {
    }

    copyHash() {
        let hash = '';

        for (const i in this.insertion.insertion_group_tags) {
            if (this.insertion) {
                hash += this.insertion.insertion_group_tags[i].name + '=' + this.insertion.insertion_group_tags[i].hash + '\n';
            }
        }
        this.clipboard.copy(hash);
    }

    showModalExcel(group: Group) {
        this.modal.group = group;
        this.modal.show = true;
    }

    closeModalExcel($event) {
        this.modal.show = false;
        this.modal.group = new Group();
    }

    downloadExcel(insertion: Insertion) {


        this.insertionService.downloadExcel([insertion.id]).subscribe((data) => {
            this.downloadService.run(data, 'urls.xlsx');

        }, error => {
            if (error.status === 404) {
                return this.router.navigate(['/error/404']);
            }

            return new ErrorHandler(error).show();
        });
    }
}
