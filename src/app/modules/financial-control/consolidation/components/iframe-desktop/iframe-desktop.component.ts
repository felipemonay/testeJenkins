import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iframe-desktop',
  templateUrl: './iframe-desktop.component.html'
})
export class IframeDesktopComponent implements OnInit {
  visible: boolean = true;
  breakpoint: number = 820;

  constructor() {
  }

  ngOnInit(){

  }
  
  // onResizeDesktop(event) {
  //   const w = event.target.innerWidth;
  //   if (w > this.breakpoint) {
  //     this.visible = true;
  //     console.log('desktop-ok');
  //   } else {
  //     this.visible = false;
  //     console.log('!desktop-ok');
  //   }
  // }

}
