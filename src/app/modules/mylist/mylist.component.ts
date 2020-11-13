import { Component, Input, OnInit } from '@angular/core';
// import { PopoverComponent } from '../../component/popover/popover.component';//popover弹出菜单
import { PopoverController } from '@ionic/angular';
import { ListpopoverComponent } from './listpopover/listpopover.component';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss'],
})
export class MylistComponent implements OnInit {

  public cardType:any; //卡片类型
  public artid:any; //文章id
  @Input() tabState:any; //卡片类型

  constructor(public popoverController:PopoverController) {

   }

  ngOnInit() {
    this.artid='66'//路由传值测试
    console.log("这是list组件",this.tabState)
    
  }
  async presentPopover(ev: any) {
     
    const popover = await this.popoverController.create({
      component: ListpopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    console.log("ev",ev);
    return await popover.present();

  }
  




}