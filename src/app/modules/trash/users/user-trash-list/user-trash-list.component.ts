import {Component, OnInit} from '@angular/core';
import {Pagination} from '../../../../shared/models/pagination';
import {AccessLevelService} from '../../../../shared/services/access-level.service';
import {Router} from '@angular/router';
import {ErrorHandler} from '../../../../shared/http/responses/error-handler';
import {UserTrashService} from '../user-trash.service';
import {User} from '../../../../shared/models/user';

@Component({
    selector:    'app-user-trash-list',
    templateUrl: './user-trash-list.component.html'
})

export class UserTrashListComponent implements OnInit {
    public users: Pagination = new Pagination();

    private canSend = true;

    constructor(private userTrashService: UserTrashService, private accessLevelService: AccessLevelService, private router: Router) {
    }

    ngOnInit() {
        this.accessLevelService.is_accessible('trash/users', 'App\\Http\\Controllers\\Api\\Trash\\UserController@index').subscribe((data: boolean) => {
            if (!data) {
                return this.router.navigate(['/error/403']);
            }
        });

        this.getUsers(1);
    }

    getUsers(page: number = 1) {
        if (!this.canSend) {
            return;
        }
        this.canSend = false;
        this.userTrashService.paginate(page).subscribe(data => {
            this.users = data;
            this.canSend = true;
        }, error => {
            this.canSend = true;
            if (error.status !== 401) {
                return new ErrorHandler(error).show();
            }
        });
    }

    confirm(user: User) {
    }
}
