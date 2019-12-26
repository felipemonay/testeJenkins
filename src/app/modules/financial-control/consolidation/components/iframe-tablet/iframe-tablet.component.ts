import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iframe-tablet',
  templateUrl: './iframe-tablet.component.html'
})
export class IframeTabletComponent implements OnInit {
  visible: boolean = false;
  breakpointMin: number = 640;
  breakpointMax: number = 820;

  constructor() {
  }

  ngOnInit(){

  }
  
  // onResizeTablet(event) {
  //   const w = event.target.innerWidth;
  //   if (w >= this.breakpointMin && w <= this.breakpointMax) {
  //     this.visible = true;
  //     console.log('tablet-ok');
  //   } else {
  //     this.visible = false;
  //     console.log('!tablet-ok');
  //   }
  // }

}
 