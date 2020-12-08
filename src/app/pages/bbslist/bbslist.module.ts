import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BbslistPageRoutingModule } from './bbslist-routing.module';

import { BbslistPage } from './bbslist.page';
import {MylistModule} from '../../modules/mylist/mylist.module'

@NgModule({
  imports: [
    MylistModule,
    CommonModule,
    FormsModule,
    IonicModule,
    BbslistPageRoutingModule
  ],
  declarations: [BbslistPage]
})
export class BbslistPageModule {}
