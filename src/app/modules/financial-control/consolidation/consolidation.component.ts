import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-consolidation',
  templateUrl: './consolidation.component.html',
  styleUrls: ['./consolidation.component.scss']
})
export class ConsolidationComponent implements OnInit {

  constructor() { }

  public innerWidth: any;

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerWidth = window.innerWidth;
}

}
