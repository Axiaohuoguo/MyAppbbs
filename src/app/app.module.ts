import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http'
import { IonicModule, IonicRouteStrategy, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Http2Service } from './services/MyHttp2.service';
// import { MsgLoadingService } from './services/msg-loading.service';
// import { MyrequestService } from './services/myrequest.service';
import {GlobalData} from './provider/GlobalData'
import { NoplugService} from './provider/noplugService'
import { CookieModule } from 'ngx-cookie';

// import { CKEditorModule } from '@ckeditor/ckeditor5-angular'; //富文本编辑器


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';




@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    // CKEditorModule,
    CookieModule.forRoot(),
    BrowserModule, 
    HttpClientModule,
    IonicStorageModule.forRoot(),//sqllit-storage 引入缓存模块    
    IonicModule.forRoot(
    {
      mode: 'ios',
      backButtonText:"返回"  //配置默认的返回按钮
    }
  ), AppRoutingModule],
  providers: [
    NoplugService,
    GlobalData,
    Http2Service,
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
