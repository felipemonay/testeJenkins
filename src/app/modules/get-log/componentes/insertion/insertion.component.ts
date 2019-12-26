import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-insertion',
  templateUrl: './insertion.component.html'
})
export class InsertionComponent implements OnInit {

  public help: string = 'Insira um número de inserção';

  public label: string = 'Nº Inserção';

  @Output() insertion_id: EventEmitter<string> = new EventEmitter<string>();

  @Input() getInsertion: string = '';

  constructor() { }

  ngOnInit() {
  }

  getValues(event) {
    this.insertion_id.emit(event);
  }

}
