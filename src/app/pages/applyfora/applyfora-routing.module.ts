import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplyforaPage } from './applyfora.page';

const routes: Routes = [
  {
    path: '',
    component: ApplyforaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplyforaPageRoutingModule {}
