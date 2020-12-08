import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoresettingPage } from './moresetting.page';

const routes: Routes = [
  {
    path: '',
    component: MoresettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoresettingPageRoutingModule {}
