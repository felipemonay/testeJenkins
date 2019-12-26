import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/models/user';
import {UserService} from '../user.service';
import {CompanyService} from '../../../shared/services/company.service';
import {Company} from '../../../shared/models/company';
import {Router} from '@angular/router';
import {ErrorHandler} from '../../../shared/http/responses/error-handler';
import {SuccessHandler} from '../../../shared/http/responses/success-handler';
import {AccessLevelService} from '../../../shared/services/access-level.service';

@Component({
    selector:    'app-user-create',
    templateUrl: './user-create.component.html'
})

export class UserCreateComponent implements OnInit {
    public user: User = new User();

    public companies: Array<Company> = [];

    private canSend = true;

    constructor(private userService: UserService,
                private companyService: CompanyService,
                private accessLevelService: AccessLevelService,
                private router: Router) {
    }

    ngOnInit() {
        this.accessLevelService.is_accessible('users', 'App\\Http\\Controllers\\Api\\UserController@index').subscribe((data: boolean) => {
            if (!data) {
                return this.router.navigate(['/error/403']);
            }
        });

        this.getCompanies();
    }

    getCompanies() {
        this.companyService.all().subscribe(data => {
            this.companies = data;
        });
    }

    send() {
        if (!this.canSend) {
            return;
        }
        this.canSend = false;
        this.userService.create(this.user).subscribe(user => {
            new SuccessHandler('Usuário cadastrado com sucesso.').show().then(() => {
                this.canSend = true;
                this.router.navigate(['/users/update'], {queryParams: {id: user.id}});
            });
        }, error => {
            this.canSend = true;
            return new ErrorHandler(error).show();
        });
    }
}
