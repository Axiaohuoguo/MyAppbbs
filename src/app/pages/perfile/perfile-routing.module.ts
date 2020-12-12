import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilePage } from './perfile.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilePageRoutingModule {}
