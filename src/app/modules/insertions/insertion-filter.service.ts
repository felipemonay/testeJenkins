import {Injectable} from '@angular/core';

@Injectable(<any>{
    providedIn: 'root'
})

export class InsertionFilterService {
    constructor() {
    }

    getSelectedFilters(): Array<string> {
        let default_fields = [
            'id', 'campaign_name', 'pi_number', 'reference_date', 'area', 'media', 'created_at'
        ];

        if (!localStorage.getItem('default_selected_filters')) {
            localStorage.setItem('default_selected_filters', default_fields.join(','));
        }

        let items = localStorage.getItem('default_selected_filters').split(',');
        items = items.filter((item, index, arr) => {
            return item !== 'excel_download';
        });
        return items;
    }

    addSelectedFilters(field: string): Array<string> {
        let fields = localStorage.getItem('default_selected_filters').split(',');

        fields.push(field);

        localStorage.setItem('default_selected_filters', fields.join(','));

        return fields;
    }

    removeSelectedFilters(field: string): Array<string> {
        let fields = localStorage.getItem('default_selected_filters').split(',');

        fields.splice(fields.indexOf(field), 1);

        localStorage.setItem('default_selected_filters', fields.join(','));

        return fields;
    }

    getSearch(): any {
        let default_search = {
            id:             '',
            insertion_id:   '',
            campaign_name:  '',
            pi_number:      '',
            reference_date: '',
            area:           '',
            media:          '',
            impact:         '',
            impact_type_id: '',
            initiative_id:  '',
            investment:     '',
            pi_not_rated:   '',
            pi_type_id:     '',
            unit_cost:      '',
            comments:       '',
            company_id:     '',
            user:           '',
            excel_download: ''
        };

        if (!localStorage.getItem('default_search')) {
            localStorage.setItem('default_search', JSON.stringify(default_search));
        }

        return JSON.parse(localStorage.getItem('default_search'));
    }

    setSearch(search: any): void {
        localStorage.setItem('default_search', JSON.stringify(search));
    }

    getSort(): any {
        let default_sort = {
            column:    '',
            direction: ''
        };

        if (!localStorage.getItem('default_sort')) {
            localStorage.setItem('default_sort', JSON.stringify(default_sort));
        }

        return JSON.parse(localStorage.getItem('default_sort'));
    }

    setSort(sort: any): void {
        localStorage.setItem('default_sort', JSON.stringify(sort));
    }

    addCheckedItens(field: any): any {
        const fieldsChecked = this.getCheckedItens();
        fieldsChecked.push(field);

        localStorage.setItem('default_checked_itens', JSON.stringify(fieldsChecked));

        return fieldsChecked;
    }

    getCheckedItens(): Array<number> {
        return JSON.parse(localStorage.getItem('default_checked_itens')) || [];
    }

    removeCheckedFilters(id: number): Array<number> {
        let fields = this.getCheckedItens();

        fields = fields.filter((elem: any, index, arr) => elem.id !== id);

        localStorage.setItem('default_checked_itens', JSON.stringify(fields));

        return fields;
    }

    clearAll() {
        this.clearFilters();
        this.clearSearch();
    }

    clearFilters() {
        localStorage.removeItem('default_selected_filters');
    }

    clearSearch() {
        localStorage.removeItem('default_search');
        localStorage.removeItem('default_sort');
    }
}
