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

  public cardInfo:any;

  public cardType:any; //卡片类型
  public artid:any; //文章id
  @Input() tabState:any; //卡片类型

  @Input() artList :any; //文章列表 all 的所有传值
  @Input() pageType:any;

  constructor(public popoverController:PopoverController) {

   }

  ngOnInit() {
    
    this.artid='66'//路由传值测试
    console.log("这是list组件",this.tabState)
    console.log(this.pageType)
    
  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    // console.log('lll',this.artList.artList)
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
