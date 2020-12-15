import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RereplypagePageRoutingModule } from './rereplypage-routing.module';

import { RereplypagePage } from './rereplypage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RereplypagePageRoutingModule
  ],
  declarations: [RereplypagePage]
})
export class RereplypagePageModule {}
