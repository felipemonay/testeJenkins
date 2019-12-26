import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { IOption } from "ng-select";
import { SelectService } from "../../../../shared/services/select.service";
import { ErrorHandler } from "src/app/shared/http/responses/error-handler";

@Component({
  selector: 'app-company-select',
  templateUrl: './company-select.component.html'
})
export class CompanySelectComponent implements OnInit {

  public helpCompany: string = 'Escolha uma compania';
  
  constructor(private SelectService: SelectService) { }

  companies: Array<IOption> = [];
  company: string;
  public label: string = 'Compania';

  @Output() companyFilter: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {

    this.SelectService.allCompanies().subscribe(
      data => {
        this.companies = this.SelectService.toOptionsCompanies(data);
      },
      error => {
        return new ErrorHandler(error).show();
      }
    );
  }

  onSelectCompanies(option: IOption) {
    this.company = option.value;
  }

  onDeselected() {
    this.company = '';
    this.companyFilter.emit(this.company);
  }

  filter(){
    if (this.company){
      this.companyFilter.emit(this.company);
    }
  }
}
