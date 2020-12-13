import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuditsettingPageRoutingModule } from './auditsetting-routing.module';

import { AuditsettingPage } from './auditsetting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuditsettingPageRoutingModule
  ],
  declarations: [AuditsettingPage]
})
export class AuditsettingPageModule {}
