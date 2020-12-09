import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyartlistPage } from './myartlist.page';

const routes: Routes = [
  {
    path: '',
    component: MyartlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyartlistPageRoutingModule {}
