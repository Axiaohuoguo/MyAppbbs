import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendlistPage } from './friendlist.page';

const routes: Routes = [
  {
    path: '',
    component: FriendlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendlistPageRoutingModule {}
