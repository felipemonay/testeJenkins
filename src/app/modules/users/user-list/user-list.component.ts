import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/models/user';
import {UserService} from '../user.service';
import {Pagination} from '../../../shared/models/pagination';
import {Company} from '../../../shared/models/company';
import {CompanyService} from '../../../shared/services/company.service';
import {SuccessHandler} from '../../../shared/http/responses/success-handler';
import {ErrorHandler} from '../../../shared/http/responses/error-handler';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {AccessLevelService} from '../../../shared/services/access-level.service';

@Component({
    selector:    'app-user-list',
    templateUrl: './user-list.component.html'
})

export class UserListComponent implements OnInit {
    public users: Pagination = new Pagination();

    public companies: Array<Company> = [];
    public search = {
        id:         '',
        name:       '',
        company_id: '',
        email:      '',
        phone:      ''
    };
    public sort: any = {
        column:    '',
        direction: ''
    };
    private canSubmmit = true;

    constructor(private userService: UserService,
                private companyService: CompanyService,
                private toastr: ToastrService,
                private accessLevelService: AccessLevelService,
                private router: Router) {
    }

    ngOnInit() {
        this.accessLevelService.is_accessible('users', 'App\\Http\\Controllers\\Api\\UserController@index').subscribe((data: boolean) => {
            if (!data) {
                return this.router.navigate(['/error/403']);
            }
        });

        this.getUsers(1);

        this.companyService.all().subscribe(data => {
            this.companies = data;
        });
    }

    sorting($event) {
        if (!$event.direction) {
            $event.column = '';
        }

        this.sort = $event;

        this.getUsers(1);
    }

    getUsers(page: number = 1) {
        this.userService.paginate(page, this.search, this.sort).subscribe(data => {
            this.users = data;
            //console.log(this.users);
        }, error => {
            return new ErrorHandler(error).show();
        });
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
        if (!this.canSubmmit) {
            return;
        }
        this.canSubmmit = false;
        this.userService.destroy(user.id).subscribe(response => {
            this.canSubmmit = true;
            return new SuccessHandler('Usuário excluído com sucesso.').show().then(() => {
                this.users.data.splice(this.users.data.indexOf(user), 1);
            });
        }, error => {
            this.canSubmmit = true;
            return new ErrorHandler(error).show();
        });
    }

    changeStatus(user: User) {
        this.userService.update(user, true).subscribe(() => {
            this.toastr.success(user.name + '<br><strong>' + (user.status ? 'Habilitado' : 'Desabilitado') + '</strong>', 'Registro Salvo');
        }, error => {
            return new ErrorHandler(error).show();
        });
    }
}
