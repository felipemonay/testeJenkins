import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-start-date',
  templateUrl: './start-date.component.html',
})
export class StartDateComponent implements OnInit {

  public helpDateStart: string = 'Insira uma data inicial';

  @Output() emitirDataStart: EventEmitter<string> = new EventEmitter<string>(); 
  
  @Input() startDate: string = '';

  public label: string = 'Data do inicío (mm/aaaa)';

  constructor() { }

  ngOnInit() {
  }
  
  getValues(event) {
    this.emitirDataStart.emit(event);
  }
}
