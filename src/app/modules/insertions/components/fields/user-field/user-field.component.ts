import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Insertion} from '../../../../../shared/models/insertion';
import {IOption} from 'ng-select';
import {UserService} from '../../../../users/user.service';
import {User} from '../../../../../shared/models/user';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector:    'app-user-field',
    templateUrl: './user-field.component.html'
})

export class UserFieldComponent implements OnInit {
    @ViewChild('user') user: any;
    public users: Array<IOption> = [];
    public name: string = 'user_id';
    public label: string = 'Usuário';
    public help: string = '';

    constructor(private userService: UserService, private toastr: ToastrService) {
    }

    public _insertion: Insertion;

    @Input()
    set insertion(insertion: Insertion) {
        if (insertion.user_id && this.users) {
            this.user.select(String(insertion.user_id));
        }

        this._insertion = insertion;
    }

    ngOnInit() {
        this.userService.all().subscribe(data => {
            this.users = this.userService.toOptions(data);

            if (this._insertion.user_id && this._insertion.user) {
                this.existsInSelect(this._insertion.user);
            }
        });
    }

    onSelect(option: IOption) {
        this._insertion.user_id = Number(option.value);
    }

    existsInSelect(user: User) {
        for (let i in this.users) {
            if (parseInt(this.users[i].value) === user.id) {
                return;
            }
        }

        this.toastr.warning('O usuário ' + user.name + ' (' + user.id + ') que criou essa inserção foi deletado.', '', {timeOut: 10000});
    }
}
