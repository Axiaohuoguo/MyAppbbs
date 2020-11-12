import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss'],
})
export class MylistComponent implements OnInit {

  public cardType:any; //卡片类型
  public artid:any; //文章id
  @Input() tabState:any; //卡片类型

  constructor() {

   }

  ngOnInit() {
    this.artid='66'//路由传值测试
    console.log("这是list组件",this.tabState)
    
  }
  




}
