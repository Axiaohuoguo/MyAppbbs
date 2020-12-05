import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PulishoreditPage } from './pulishoredit.page';

const routes: Routes = [
  {
    path: '',
    component: PulishoreditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PulishoreditPageRoutingModule {}
