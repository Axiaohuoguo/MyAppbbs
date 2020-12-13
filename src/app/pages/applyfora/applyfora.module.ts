import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplyforaPageRoutingModule } from './applyfora-routing.module';

import { ApplyforaPage } from './applyfora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplyforaPageRoutingModule
  ],
  declarations: [ApplyforaPage]
})
export class ApplyforaPageModule {}
