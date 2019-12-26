import {Component, OnInit} from '@angular/core';
import {IOption} from 'ng-select';
import {CompanyService} from 'src/app/shared/services/company.service';
import {AccessLevelService} from 'src/app/shared/services/access-level.service';
import {AdminService} from '../../admin.service';
import {Company} from 'src/app/shared/models/company';

@Component({
    selector:    'app-admin-access-level',
    templateUrl: './admin-access-level.component.html'
})
export class AdminAccessLevelComponent implements OnInit {

    public groups: Array<IOption> = [];
    public companies: Array<Company>;
    public label = 'Grupos';

    constructor(private companyService: CompanyService,
                private accessLevelService: AccessLevelService,
                private adminService: AdminService) {
    }

    ngOnInit() {
        this.accessLevelService.all().subscribe((data: any) => {
            this.groups = this.adminService.toOptions(data);
        });
        this.companyService.all().subscribe((data: any) => {
            this.companies = data;
        });
    }

    listMedia(accessLevel: number, company: number) {
        this.adminService.getMedias(accessLevel, company).subscribe((data: any) => {
        });
    }
}
