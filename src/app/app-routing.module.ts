import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'content/:artid',
    loadChildren: () => import('./pages/content/content.module').then( m => m.ContentPageModule)
  },
  {
    path: 'publish',
    loadChildren: () => import('./pages/publish/publish.module').then( m => m.PublishPageModule)
  },
  {
    path: 'pulishoredit/:flag/:id',
    loadChildren: () => import('./pages/pulishoredit/pulishoredit.module').then( m => m.PulishoreditPageModule)
  },
  {
    path: 'moresetting',
    loadChildren: () => import('./pages/moresetting/moresetting.module').then( m => m.MoresettingPageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./pages/editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'bbslist/:flag/:key',
    loadChildren: () => import('./pages/bbslist/bbslist.module').then( m => m.BbslistPageModule)
  },
  {
    path: 'myartlist',
    loadChildren: () => import('./pages/myartlist/myartlist.module').then( m => m.MyartlistPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
