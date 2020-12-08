import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BbslistPage } from './bbslist.page';

const routes: Routes = [
  {
    path: '',
    component: BbslistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BbslistPageRoutingModule {}
