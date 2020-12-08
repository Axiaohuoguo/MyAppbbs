import { Component, OnInit } from '@angular/core';
import { Http2Service } from '../services/MyHttp2.service'
import { GlobalData } from '../provider/GlobalData'
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { NoplugService } from '../provider/noplugService';
import { CookieService } from 'ngx-cookie';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})

export class Tab4Page implements OnInit {


  userInfo: any = {
  }
  constructor(
    public http: Http2Service,
    public globalData: GlobalData,
    public nav: NavController,
    public storage: Storage,
    public noplugService: NoplugService,
    public cookieService: CookieService
  ) { }

  ngOnInit() {
    this.verif()

  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.

  }


  /**
   * 退出登录
   */
  logonOut() {

    this.noplugService.alertIscontinue("退出登录", "确定退出登录？", ca => {
      if (ca) {
        console.log("OK")
        //退出登录 
        let api = "/user/loginout"
        this.http.get(api).subscribe((res: any) => {
          console.log(res)
        })
        //清除本地缓存和cookie
        this.cookieService.removeAll()
        this.storage.clear()
      }
      else return
    })

  }
  /**
   * 清除缓存
   */
  clearCache(){
    this.noplugService.alertIscontinue("清除缓存","确定清除",ca=>{
      if(ca){
        this.storage.clear()
        this.noplugService.alert("清除成功")
      }
      else return
    })
  }

  /**
   * 验证
   */
  verif() {
    this.storage.get("userinfo").then(userinfo => {
      if (userinfo == '' || userinfo == null) {
        this.nav.navigateRoot(['./login'])
        this.noplugService.alert("登录过期请重新登录")
      }
      else {
        this.userInfo = JSON.parse(userinfo)

        console.log(this.userInfo)
      }

    })

  }

}
