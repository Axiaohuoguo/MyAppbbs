import { Component, OnInit } from '@angular/core';
import { Http2Service } from '../services/MyHttp2.service'
import { GlobalData } from '../provider/GlobalData'
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { NoplugService } from '../provider/noplugService';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})

export class Tab4Page implements OnInit {

  public myuserid: any // 当前用户id

  userInfo: any = {
  }
  follownum:any = 0
  fansnum:any = 0

  constructor(
    public http: Http2Service,
    public globalData: GlobalData,
    public nav: NavController,
    public storage: Storage,
    public noplugService: NoplugService,
    public cookieService: CookieService
  ) { }

  ngOnInit() {
    this.getUser().subscribe(data=>{
      // console.log(data)
       this.myuserid = data._userId
       if(data != null){
        this.getfollownum(data._userId)       
        this.getfansnum(data._userId)
       }
    })
    

  }
  // 关注数
  getfollownum(myid){
    let api = "/user/getfollownum"
    let par = {"myid":myid}
    this.http.get(api,par).subscribe((res:any)=>{
      // console.log(res)
      this.follownum= res.data
    })

  }
  // 粉丝数
  getfansnum(myid){
    let api = "/user/getfansnum"
    let par = {"myid":myid}
    this.http.get(api,par).subscribe((res:any)=>{
      // console.log(res)
      this.fansnum= res.data
    })
  }

    // 获得当前用户
    getUser(): Observable<any> {
      return new Observable(obser => {
        this.storage.get("userinfo").then((user: any) => {
          if (user == null) {
            this.noplugService.alert("身份验证失败...")
            this.nav.navigateRoot(['./login'])
            obser.error("erro")
          }
          obser.next(JSON.parse(user))
          this.userInfo =   JSON.parse(user)
        })
  
      })
    }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.

  }

  // 下拉刷新
  doRefresh(e) {
    setTimeout(() => {
      this.getUser().subscribe(data=>{
        // console.log(data)
         this.myuserid = data._userId
         if(data != null){
          this.getfollownum(data._userId)       
          this.getfansnum(data._userId)
          e.target.complete();
          e.target.disabled = !true;
         }
      })      
    }, 1000);

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
        this.nav.navigateRoot(['./login'])
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


}
