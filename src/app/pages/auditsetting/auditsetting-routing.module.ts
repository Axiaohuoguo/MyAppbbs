import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditsettingPage } from './auditsetting.page';

const routes: Routes = [
  {
    path: '',
    component: AuditsettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditsettingPageRoutingModule {}
