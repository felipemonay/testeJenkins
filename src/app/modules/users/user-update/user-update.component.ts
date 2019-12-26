import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../shared/models/user';
import {UserService} from '../user.service';
import {Company} from '../../../shared/models/company';
import {CompanyService} from '../../../shared/services/company.service';
import {SuccessHandler} from '../../../shared/http/responses/success-handler';
import {ErrorHandler} from '../../../shared/http/responses/error-handler';
import swal from 'sweetalert2';
import {AccessLevelService} from '../../../shared/services/access-level.service';

@Component({
    selector:    'app-user-update',
    templateUrl: './user-update.component.html'
})

export class UserUpdateComponent implements OnInit {
    public user: User = new User();

    public companies: Array<Company> = [];

    private canSend = true;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private userService: UserService,
                private accessLevelService: AccessLevelService,
                private companyService: CompanyService) {
    }

    ngOnInit() {
        this.accessLevelService.is_accessible('users', 'App\\Http\\Controllers\\Api\\UserController@update').subscribe((data: boolean) => {
            if (!data) {
                return this.router.navigate(['/error/403']);
            }
        });

        this.activatedRoute.queryParams.subscribe(params => {
            if (typeof params['id'] !== 'undefined') {
                return this.getUser(params['id']);
            }

            return this.router.navigate(['/error/404']);
        });

        this.getCompanies();
    }

    getCompanies() {
        this.companyService.all().subscribe(data => {
            this.companies = data;
        });
    }

    getUser(id) {
        this.userService.find(id).subscribe((user: User) => {
            this.user = user;
        }, error => {
            if (error.status === 404) {
                return this.router.navigate(['/error/404']);
            }

            if (error.status === 403) {
                return this.router.navigate(['/error/403']);
            }

            return new ErrorHandler(error).show();
        });
    }

    send() {
        if (!this.canSend) {
            return;
        }
        this.canSend = false;
        this.userService.update(this.user).subscribe(data => {
            this.canSend = true;
            return new SuccessHandler('Alterações realizadas com sucesso.').show();
        }, error => {
            this.canSend = true;
            return new ErrorHandler(error).show();
        });
    }

    sendPassword() {
        if (!this.canSend) {
            return;
        }
        this.canSend = false;
        this.userService.updatePassword(this.user).subscribe(data => {
            this.canSend = true;
            return new SuccessHandler('A senha foi alterada com sucesso.').show();
        }, error => {
            this.canSend = true;
            return new ErrorHandler(error).show();
        });

        this.user.password = null;
        this.user.password_confirmation = null;
    }

    confirm(user: User) {
        let self = this;

        swal.fire({
            title:             'Alerta!',
            text:              'Confirmar exclusão do usuário ' + user.name + '?',
            type:              'warning',
            showCancelButton:  true,
            confirmButtonText: 'Sim, continuar!',
            cancelButtonText:  'Não, cancelar!'
        }).then((response: any) => {
            if (!response.dismiss) {
                self.destroy(user);
            }
        });
    }

    destroy(user: User) {
        this.userService.destroy(user.id).subscribe(response => {
            if (!this.canSend) {
                return;
            }
            this.canSend = false;
            return new SuccessHandler('Usuário excluído com sucesso.').show().then(() => {
                this.canSend = false;
                this.router.navigate(['/users']);
            });
        }, error => {
            this.canSend = false;
            return new ErrorHandler(error).show();
        });
    }
}
