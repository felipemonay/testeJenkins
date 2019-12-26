import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsertionTrashFilterService {

  constructor() { }

  getSearch(): any {
    let default_trash_search = {
      insertion_id: '',
      campaign_name:'',
      pi_number: '',
      reference_date: '',
      company_id: '',
      deleted_at: ''
    };

    if (!localStorage.getItem('default_trash_search')) {
      localStorage.setItem('default_trash_search', JSON.stringify(default_trash_search));
    }

    return JSON.parse(localStorage.getItem('default_trash_search'));
  }

  setSearch(search: any): void {
    localStorage.setItem('default_trash_search', JSON.stringify(search));
  }

  clearSearch() {
    localStorage.removeItem('default_trash_search')
  }

}
