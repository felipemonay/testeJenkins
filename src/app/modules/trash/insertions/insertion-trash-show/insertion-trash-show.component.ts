import {Component, OnInit} from '@angular/core';
import {Insertion} from '../../../../shared/models/insertion';
import {ActivatedRoute, Router} from '@angular/router';
import {AccessLevelService} from '../../../../shared/services/access-level.service';
import {ClipboardService} from '../../../../shared/services/clipboard.service';
import {ErrorHandler} from '../../../../shared/http/responses/error-handler';
import {InsertionTrashService} from '../insertion-trash.service';
import {MediaModuleService} from '../../../../shared/services/media-module.service';

@Component({
    selector:    'app-insertion-trash-show',
    templateUrl: './insertion-trash-show.component.html'
})

export class InsertionTrashShowComponent implements OnInit {
    public insertion: Insertion = new Insertion();

    private canSend = true;

    constructor(private activatedRoute: ActivatedRoute,
                private insertionTrashService: InsertionTrashService,
                private router: Router,
                private accessLevelService: AccessLevelService,
                private clipboard: ClipboardService,
                public mediaModuleService: MediaModuleService) {
    }

    ngOnInit() {
        this.accessLevelService.is_accessible('trash/users', 'App\\Http\\Controllers\\Api\\Trash\\UserController@index').subscribe((data: boolean) => {
            if (!data) {
                return this.router.navigate(['/error/403']);
            }
        });

        this.activatedRoute.queryParams.subscribe(params => {
            if (typeof params['id'] !== 'undefined') {
                return this.getInsertion(params['id']);
            }

            return this.router.navigate(['/error/404']);
        });
    }

    getInsertion(id) {
        if (!this.canSend) {
            return;
        }
        this.canSend = false;
        this.insertionTrashService.find(id).subscribe((insertion: Insertion) => {
            this.insertion = insertion;
            this.canSend = true;
        }, error => {
            this.canSend = true;
            if (error.status === 404) {
                return this.router.navigate(['/error/404']);
            }

            return new ErrorHandler(error).show();
        });
    }

    copyHash() {
        let hash = '';

        for (let i in this.insertion.insertion_group_tags) {
            hash += this.insertion.insertion_group_tags[i].name + '=' + this.insertion.insertion_group_tags[i].hash + '\n';
        }

        this.clipboard.copy(hash);
    }

    confirm(insertion: Insertion) {
    }
}
