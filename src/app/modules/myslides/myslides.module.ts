import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyslidesComponent } from './myslides.component';//引入组件


@NgModule({
  declarations: [MyslidesComponent ],
  imports: [
    CommonModule
  ],
  exports:[ MyslidesComponent //暴露组件
  ]
})
export class MyslidesModule {

 }
