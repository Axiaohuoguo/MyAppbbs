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

  constructor(public popoverController:PopoverController) {

   }

  ngOnInit() {
    this.artid='66'//路由传值测试
    console.log("这是list组件",this.tabState)
    
  }
  //判断当前是什么类型 all-全部 follow-关注 other-其他
  judgeType(){
    if(this.tabState=='all'){

    }    
  }  
  //通过学校id获得动态列表
  getArtListByschoolID(){

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
