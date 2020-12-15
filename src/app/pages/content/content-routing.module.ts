import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentPage } from './content.page';

const routes: Routes = [
  {
    path: '',
    component: ContentPage
  },
  {
    path: 'rereplypage/:reid',
    loadChildren: () => import('./rereplypage/rereplypage.module').then( m => m.RereplypagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPageRoutingModule {}
