import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoresettingPageRoutingModule } from './moresetting-routing.module';

import { MoresettingPage } from './moresetting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoresettingPageRoutingModule
  ],
  declarations: [MoresettingPage]
})
export class MoresettingPageModule {}
