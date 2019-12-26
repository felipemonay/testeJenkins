import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../shared/models/user';
import {UserService} from '../user.service';
import {SuccessHandler} from '../../../shared/http/responses/success-handler';
import {ErrorHandler} from '../../../shared/http/responses/error-handler';
import swal from 'sweetalert2';
import {AccessLevelService} from '../../../shared/services/access-level.service';

@Component({
    selector:    'app-user-show',
    templateUrl: './user-show.component.html'
})

export class UserShowComponent implements OnInit {
    public user: User = new User();

    private canSubmmit = true;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private accessLevelService: AccessLevelService,
                private userService: UserService) {

        this.activatedRoute.queryParams.subscribe(params => {
            if (typeof params['id'] !== 'undefined') {
                return this.getUser(params['id']);
            }

            return this.router.navigate(['/error/404']);
        });
    }

    ngOnInit() {
        this.accessLevelService.is_accessible('users', 'App\\Http\\Controllers\\Api\\UserController@index').subscribe((data: boolean) => {
            if (!data) {
                return this.router.navigate(['/error/403']);
            }
        });
    }

    getUser(id) {
        this.userService.find(id).subscribe((user: User) => {
            this.user = user;
        }, error => {
            if (error.status === 404) {
                return this.router.navigate(['/error/404']);
            }

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
                this.router.navigate(['/users']);
            });
        }, error => {
            this.canSubmmit = true;
            return new ErrorHandler(error).show();
        });
    }
}
