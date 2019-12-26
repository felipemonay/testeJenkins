import {Component, OnInit} from '@angular/core';
import {User} from '../../../../shared/models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AccessLevelService} from '../../../../shared/services/access-level.service';
import {ErrorHandler} from '../../../../shared/http/responses/error-handler';
import {UserTrashService} from '../user-trash.service';

@Component({
    selector:    'app-user-trash-show',
    templateUrl: './user-trash-show.component.html'
})

export class UserTrashShowComponent implements OnInit {
    public user: User = new User();

    private canSend = true;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private accessLevelService: AccessLevelService,
                private userTrashService: UserTrashService) {

        this.activatedRoute.queryParams.subscribe(params => {
            if (typeof params['id'] !== 'undefined') {
                return this.getUser(params['id']);
            }

            return this.router.navigate(['/error/404']);
        });
    }

    ngOnInit() {
        this.accessLevelService.is_accessible('trash/users', 'App\\Http\\Controllers\\Api\\Trash\\UserController@index').subscribe((data: boolean) => {
            if (!data) {
                return this.router.navigate(['/error/403']);
            }
        });
    }

    getUser(id) {
        if (!this.canSend) {
            return;
        }
        this.canSend = false;
        this.userTrashService.find(id).subscribe((user: User) => {
            this.user = user;
            this.canSend = true;
        }, error => {
            this.canSend = true;
            if (error.status === 404) {
                return this.router.navigate(['/error/404']);
            }

            if (error.status !== 401) {
                return new ErrorHandler(error).show();
            }
        });
    }

    confirm(user: User) {
    }
}

