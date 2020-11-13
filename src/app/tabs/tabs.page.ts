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

  
 async showListMdal(){

    const modal = await this.modalController.create({
      component: PublishlistmdalComponent,
      componentProps: { //传值
        'prop1': 1,
        'prop2': 2
      }
    });
   await modal.present();
  }

}
