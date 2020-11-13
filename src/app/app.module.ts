import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(
    {
      mode: 'ios',
      backButtonText:"返回"  //配置默认的返回按钮
    }
  ), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private statusBar: StatusBar, private splashScreen: SplashScreen, private platform: Platform) {
    // this.statusBar.overlaysWebView(true)
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // // this.statusBar.styleDefault();
      // this.statusBar.styleLightContent
      // this.splashScreen.hide();
      this.statusBar.overlaysWebView(true)
    });
  }
}
