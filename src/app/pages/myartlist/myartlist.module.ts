import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyartlistPageRoutingModule } from './myartlist-routing.module';

import { MyartlistPage } from './myartlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyartlistPageRoutingModule
  ],
  declarations: [MyartlistPage]
})
export class MyartlistPageModule {}
