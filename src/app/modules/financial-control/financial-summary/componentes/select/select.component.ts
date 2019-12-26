import { SelectService } from '../../../../../shared/services/select.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IOption } from 'ng-select';
import { ErrorHandler } from 'src/app/shared/http/responses/error-handler';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  public initiatives: Array<IOption> = [];
  public label: string = 'Iniciativa';
  public help: string = 'Escolha uma iniciativa para carregar a lista filtrada';

  // @Output() filter:EventEmitter<initiative> = new EventEmitter<initiative>();

  constructor(private SelectService: SelectService) { }

  @Output() initiativeFilter: EventEmitter<string> = new EventEmitter<string>();

  initiative: string;

  ngOnInit() {
    this.SelectService.all().subscribe(data => {
      this.initiatives = this.SelectService.toOptions(data);
    }, error => {
      return new ErrorHandler(error).show();
    });
  }

  onSelect(option: IOption) {
    this.initiative = option.value;
  }

  onDeselected() {
    this.initiative = '';
  }

  filter(){
    if (this.initiative){
      this.initiativeFilter.emit(this.initiative);
    }
  }

}


