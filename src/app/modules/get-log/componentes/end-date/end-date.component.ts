import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-end-date',
  templateUrl: './end-date.component.html'
})
export class EndDateComponent implements OnInit {

  public helpDateEnd: string = 'Insira uma data final';
  
  @Input() getEndDate: string = '';

  @Output() emitirData: EventEmitter<string> = new EventEmitter<string>();

  public label: string = 'Data do fim (mm/aaaa)';

  constructor() { }

  ngOnInit() {
  }

  getValues(event) {
    this.emitirData.emit(event);
  }


}
