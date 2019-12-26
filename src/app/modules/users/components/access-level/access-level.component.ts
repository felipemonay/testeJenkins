import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../shared/models/user';
import {AccessLevelService} from '../../../../shared/services/access-level.service';
import {AccessLevelGroup} from '../../../../shared/models/access-level-group';
import {SuccessHandler} from '../../../../shared/http/responses/success-handler';
import {ErrorHandler} from '../../../../shared/http/responses/error-handler';

@Component({
    selector:    'app-access-level',
    templateUrl: './access-level.component.html'
})

export class AccessLevelComponent implements OnInit {
    @Input()
    public user: User = new User();

    public groups: Array<AccessLevelGroup> = [];

    public show: boolean = false;

    private canSubmmit = true;

    constructor(private accessLevelService: AccessLevelService) {
    }

    ngOnInit() {
        this.accessLevelService.is_accessible('access-levels', 'App\\Http\\Controllers\\Api\\AccessLevelController@save').subscribe(response => {
            this.show = response;
        });

        this.accessLevelService.all().subscribe(data => {
            this.groups = data;
        });
    }

    changeCheck(event: any, group: AccessLevelGroup) {
        if (!event.target.checked) {
            for (let i in this.user.access_level_groups) {
                if (this.user.access_level_groups[i].id === group.id) {
                    return this.user.access_level_groups.splice(this.user.access_level_groups.indexOf(this.user.access_level_groups[i]), 1);
                }
            }
        }

        let access_level_group = new AccessLevelGroup();

        access_level_group.id = group.id;

        this.user.access_level_groups.push(access_level_group);
    }

    handlesChecked(group: AccessLevelGroup) {
        for (let i in this.user.access_level_groups) {
            if (this.user.access_level_groups[i].id === group.id) {
                return true;
            }
        }

        return false;
    }

    send() {
        if (!this.canSubmmit) {
            return;
        }
        this.canSubmmit = false;
        this.accessLevelService.save(this.user).subscribe(data => {
            this.canSubmmit = true;
            return new SuccessHandler('Alterações realizadas com sucesso.').show();
        }, error => {
            this.canSubmmit = true;
            return new ErrorHandler(error).show();
        });
    }
}
