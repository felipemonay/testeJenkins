import {Component, Input} from '@angular/core';
import {InsertionService} from 'src/app/modules/insertions/insertion.service';
import {Router} from '@angular/router';
import {DownloadService} from 'src/app/shared/services/download.service';
import {ErrorHandler} from 'src/app/shared/http/responses/error-handler';
import {InsertionFilterService} from '../../insertion-filter.service';

@Component({
    selector:    'app-excel-list-download',
    templateUrl: './excel-list-download.component.html',
    styleUrls:   ['./excel-list-download.component.scss']
})
export class ExcelListDownloadComponent {

    @Input() optionsSelected = [];

    constructor(private downloadService: DownloadService,
                private router: Router,
                private insertionService: InsertionService,
                private insertionFilterService: InsertionFilterService) {
    }

    downloadExcel() {
        const idList = this.insertionFilterService.getCheckedItens().map((elem: any) => elem.id);
        this.insertionService.downloadExcel(idList).subscribe((data) => {
            this.downloadService.run(data, 'urls.xlsx');
        }, error => {
            if (error.status === 404) {
                return this.router.navigate(['/error/404']);
            }
            return new ErrorHandler(error).show();
        });
    }

    deleteAll(){
        this.insertionFilterService.getCheckedItens().map((elem) =>
        this.delete(elem)
        );
    };

    delete(item: any) {
        this.insertionFilterService.removeCheckedFilters(item.id);
        this.optionsSelected.splice(0, this.optionsSelected.length);
        this.insertionFilterService.getCheckedItens().map((elem) => this.optionsSelected.push(elem));
    }
}
