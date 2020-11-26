import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PublishlistmdalComponent } from '../modules/publishlistmdal/publishlistmdal.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public modalController:ModalController) {


  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

 async showListMdal(){

    const modal = await this.modalController.create({
      component: PublishlistmdalComponent,
      componentProps: { //传值
        'valueTest': 1
      }
    });
   await modal.present();
   //这里可以接受关闭后传过来的值
   const data  = await modal.onWillDismiss();
   console.log(data);
  }


}
