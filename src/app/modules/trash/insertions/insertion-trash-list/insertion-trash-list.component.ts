import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandler } from '../../../../shared/http/responses/error-handler';
import { Pagination } from '../../../../shared/models/pagination';
import { AccessLevelService } from '../../../../shared/services/access-level.service';
import { InsertionTrashFilterService } from '../insertion-trash-filter.service';
import { InsertionTrashService } from '../insertion-trash.service';
import { Company } from 'src/app/shared/models/company';
import { CompanyService } from 'src/app/shared/services/company.service';

@Component({
    selector: 'app-insertion-trash-list',
    templateUrl: './insertion-trash-list.component.html'
})

export class InsertionTrashListComponent implements OnInit {

    public insertions: Pagination = new Pagination();
    public search: any = this.insertionTrashFilterService.getSearch();
    public companies: Array<Company> = [];

    constructor(private insertionTrashService: InsertionTrashService,
        private insertionTrashFilterService: InsertionTrashFilterService,
        private accessLevelService: AccessLevelService,
        private companyService: CompanyService,
        private router: Router) {
    }

    ngOnInit() {
        this.search = this.insertionTrashFilterService.getSearch();
        this.accessLevelService.is_accessible('trash/users', 'App\\Http\\Controllers\\Api\\Trash\\UserController@index').subscribe((data: boolean) => {
            if (!data) {
                return this.router.navigate(['/error/403']);
            }
        });

        this.companyService.all().subscribe(data => {
            this.companies = data;
        });

        this.getInsertions(1);
    }

    getInsertions(page: number = 1) {
        this.insertionTrashService.all(page, this.search).subscribe(data => {
            this.insertions = data;
        }, error => {
            if (error.status !== 401) {
                return new ErrorHandler(error).show();
            }
        });
    }

    searching() {
        this.insertionTrashFilterService.setSearch(this.search);
        //console.log(this.search.deleted_at.length);
        if (this.search.deleted_at.length == 8|| this.search.deleted_at.length == 0) {
            this.getInsertions();
        }
    }

    clearSearch() {
        this.insertionTrashFilterService.clearSearch();
        this.search = this.insertionTrashFilterService.getSearch();
    }

}
