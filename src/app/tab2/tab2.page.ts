import { Component,ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

 public tabState:any = "all";

  //top栏dom
  @ViewChild('segment1',null) segment1 :any;
  
  constructor() {


  }

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

  
}
  
segmentChanged(e) {//top改变后的事件

    console.log('Segment changed',e.detail.value);
    this.tabState =e.detail.value;

  }
  

}
