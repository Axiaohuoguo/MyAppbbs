import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MylistComponent } from './mylist.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [MylistComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    MylistComponent,
  ]
})
export class MylistModule { 
  constructor(  ){

  }


}
