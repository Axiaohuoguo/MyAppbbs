import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';


import { PublishlistmdalComponent } from '../modules/publishlistmdal/publishlistmdal.component';//发布类型选择模态框

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage,PublishlistmdalComponent],
  entryComponents:[PublishlistmdalComponent]
})
export class TabsPageModule {

}
