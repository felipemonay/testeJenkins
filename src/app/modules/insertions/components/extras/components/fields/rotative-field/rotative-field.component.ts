import { Component, OnInit, Input } from '@angular/core';
import { Extra } from 'src/app/shared/models/extra';
import { Insertion } from 'src/app/shared/models/insertion';

@Component({
  selector: 'app-rotative-field',
  templateUrl: './rotative-field.component.html'
})
export class RotativeFieldComponent implements OnInit {

  public status = {
    isConfirmed: false
  };
  public name: string = 'compra_rodiziada';
  public label: string = 'Compra rodiziada';
  public _extra: Extra;
  @Input()
  public insertion: Insertion = new Insertion();

  @Input()
  public field_required = false;


  @Input()
  set extra(extra: Extra) {
    this._extra = extra;

    this.status.isConfirmed = !!(this.insertion.confirmation && this.insertion.confirmation.id);
  }

  constructor() { }

  ngOnInit() {
  }

}
