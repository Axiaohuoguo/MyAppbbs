import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilePageRoutingModule } from './perfile-routing.module';

import { PerfilePage } from './perfile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilePageRoutingModule
  ],
  declarations: [PerfilePage]
})
export class PerfilePageModule {}
