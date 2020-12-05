import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PulishoreditPageRoutingModule } from './pulishoredit-routing.module';

import { PulishoreditPage } from './pulishoredit.page';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';




@NgModule({
  imports: [
    CKEditorModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PulishoreditPageRoutingModule
  ],
  declarations: [PulishoreditPage]
})
export class PulishoreditPageModule {

}
