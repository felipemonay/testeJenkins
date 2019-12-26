import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Pagination} from '../../models/pagination';

@Component({
    selector:    'app-pagination',
    templateUrl: './pagination.component.html'
})

export class PaginationComponent {
    @Output()
    public navigate: EventEmitter<any> = new EventEmitter();

    public data: Pagination = new Pagination();

    public pages: Array<number> = [];

    constructor() {
    }

    @Input()
    set _data(data: Pagination) {
        this.data = data;
        this.pages = this.generatePagesArray(data.current_page, data.total, data.per_page, 7);
    }

    navigateTo(page: number): void {
        this.navigate.emit(page);
    }

    prevPage(page: number): boolean | void {
        if (this.data.current_page == 1) {
            return false;
        }

        this.navigateTo(page);
    }

    nextPage(page: number): boolean | void {
        if (this.data.current_page == this.data.last_page) {
            return false;
        }

        this.navigateTo(page);
    }

    private generatePagesArray(currentPage, collectionLength, rowsPerPage, paginationRange) {
        let pages = [];
        let totalPages = Math.ceil(collectionLength / rowsPerPage);
        let halfWay = Math.ceil(paginationRange / 2);
        let position;

        if (currentPage <= halfWay) {
            position = 'start';
        } else if (totalPages - halfWay < currentPage) {
            position = 'end';
        } else {
            position = 'middle';
        }

        let ellipsesNeeded = paginationRange < totalPages;
        let i = 1;

        while (i <= totalPages && i <= paginationRange) {
            let pageNumber = this.calculatePageNumber(i, currentPage, paginationRange, totalPages);
            let openingEllipsesNeeded = (i === 2 && (position === 'middle' || position === 'end'));
            let closingEllipsesNeeded = (i === paginationRange - 1 && (position === 'middle' || position === 'start'));

            if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
                pages.push('...');
            } else {
                pages.push(pageNumber);
            }

            i++;
        }

        return pages;
    }

    private calculatePageNumber(i, currentPage, paginationRange, totalPages) {
        let halfWay = Math.ceil(paginationRange / 2);

        if (i === paginationRange) {
            return totalPages;
        } else if (i === 1) {
            return i;
        } else if (paginationRange < totalPages) {
            if (totalPages - halfWay < currentPage) {
                return totalPages - paginationRange + i;
            } else if (halfWay < currentPage) {
                return currentPage - halfWay + i;
            } else {
                return i;
            }
        } else {
            return i;
        }
    }
}
