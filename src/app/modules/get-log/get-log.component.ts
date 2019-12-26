import { GetLogService } from './../../shared/services/get-log.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../shared/models/pagination'
import { ErrorHandler } from 'src/app/shared/http/responses/error-handler';


@Component({
  selector: 'app-get-log',
  templateUrl: './get-log.component.html',
})
export class GetLogComponent implements OnInit {

  public activities: Pagination = new Pagination();

  page: number = 1;

  public userType: string = '';

  public companyFilter: number = null;

  public endDateFilter: string = '';

  public startDateFilter: string = '';

  public insertion_id: string = '';

  public company: string = '';

  public endDate: string = '';

  public errorMessage: string = '';

  startDateFull: string;
  endDateFull: string;

  public search = {
    id: '',

    insertion_id: '',

    user_id: '',

    company_id: '',

    place: '',

    place_message: '',

    created_at: '',

  }

  public sort: any = {
    column: '',
    direction: ''
  }

  constructor(
    private GetLogService: GetLogService
  ) { }

  ngOnInit() {
    this.userType = localStorage.getItem('userType');
    this.endDateFilter = (new Date().getMonth() + 1).toString() + '/' + new Date().getFullYear().toString();
    this.startDateFilter = (new Date().getMonth() + 1).toString() + '/' + new Date().getFullYear().toString();
  }

  getActivityHistory(page = 1, startDate?, endDate?) {
    if (startDate == undefined || endDate == undefined) {
      this.convertDate();
      startDate = this.startDateFull;
      endDate = this.endDateFull;
      if (startDate == '-' || endDate == '-'){
        startDate = '';
        endDate = '';
      }
      this.requestActivityHistory(page, startDate, endDate);
    } else {
      this.requestActivityHistory(page, startDate, endDate);
    }
  }

  requestActivityHistory(page = 1, startDate, endDate) {
    this.GetLogService.paginateHistory(page, this.sort, startDate, endDate, this.companyFilter,this.insertion_id).subscribe(data => {
      this.activities = data;
    }, error => {
      return new ErrorHandler(error).show();
    });
  }

  convertDate() {
    let startMes = '';
    let startAno = '';
    let endMes = '';
    let endAno = '';
    startMes = this.startDateFilter.substr(0, 2);
    startAno = this.startDateFilter.substr(3, 4);
    endMes = this.endDateFilter.substr(0, 2);
    endAno = this.endDateFilter.substr(3, 4);
    this.startDateFull = startAno + '-' + startMes;
    this.endDateFull = endAno + '-' + endMes;
  }

  onSubmit() {
    let page = 1;
    if (this.startDateFilter != '' && this.endDateFilter != '') {
      this.convertDate();
      this.getActivityHistory(page, this.startDateFull, this.endDateFull);

    } else {
      this.getActivityHistory(page, this.startDateFilter, this.endDateFilter);
    }
  }

  child(company) {
    this.company = company;
  }


  getCompany(event) {
    this.companyFilter = event;
  }

  getDataEnd(event) {
    this.endDateFilter = event;
  }

  getDataStart(event) {
    this.startDateFilter = event;
  }

  getInsertion(event) {
    this.insertion_id = event;
  }

}
