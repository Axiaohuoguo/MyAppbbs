import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http'
import { IonicModule, IonicRouteStrategy, ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Http2Service } from './services/MyHttp2.service';
import { GlobalData } from './provider/GlobalData'
import { NoplugService } from './provider/noplugService'
import { CookieModule } from 'ngx-cookie';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Storage } from '@ionic/storage'




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
        backButtonText: "返回"  //配置默认的返回按钮
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
  constructor(
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private platform: Platform,
    public router: Router,
    public noplugService: NoplugService,
    public modalController: ModalController,
    public storage:Storage
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false)
      this.statusBar.backgroundColorByHexString("#ffffff")
    });
  }

  backButtonEvent() {

    this.platform.backButton.subscribe(() => {
      if (this.router.url == '/tabs/tab1'
        || this.router.url == '/tabs/tab2'
        || this.router.url == '/tabs/tab3'
        || this.router.url == '/tabs/tab4'
        || this.router.url == '/login'
        ) {
        this.storage.get("isOpenMod").then(dat=>{
          if(dat==null){
            this.panduanExit();
          }
        })
      }

    })

  }
  isExit = true;
  panduanExit() {
    if (this.isExit) {
      this.noplugService.showToast("再按一次退出",1000,"top")
      this.isExit = false;
      setTimeout(() => {
        this.isExit = true;
      }, 2000);
    }
    else {
      navigator['app'].exitApp(); //退出APP
    }
  }

}
