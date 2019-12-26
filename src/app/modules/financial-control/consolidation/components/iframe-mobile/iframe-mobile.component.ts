import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iframe-mobile',
  templateUrl: './iframe-mobile.component.html'
})
export class IframeMobileComponent implements OnInit {
  visible: boolean = false;
  breakpoint: number = 640;

  constructor() {
  }

  ngOnInit(){

  }
  
  // onResizeMobile(event) {
  //   const w = event.target.innerWidth;
  //   if (w < this.breakpoint) {
  //     this.visible = true;
  //     console.log('mobile-ok');
  //   } else {
  //     this.visible = false;
  //     console.log('!mobile-ok');
  //   }
  // }

}
