import { Component, OnInit } from '@angular/core';
import { Http2Service } from '../../services/MyHttp2.service'
import { NoplugService } from '../../provider/noplugService'
import { Storage } from '@ionic/storage'
import { CookieService } from 'ngx-cookie';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { GlobalData } from '../../provider/GlobalData';

// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; //imports
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  static isRemember: boolean;

  loginInfo: any = {
    username: '',
    password: '',
    isRemember: true
  }

  isShowflage = false;
  isShow: string = "eye-off-outline"
  isPas: string = "password"
  isShowClick() {

    this.isShowflage = !this.isShowflage;
    if (!this.isShowflage) {
      this.isShow = "eye-outline";
      this.isPas = "text"
    }
    else {
      this.isShow = "eye-off-outline"
      this.isPas = "password"

    }
  }

  constructor(
    public storage:Storage,
    public nav:NavController,
    public globalData: GlobalData,
    public http2Service: Http2Service,
    public noplugService: NoplugService,
    public cookieService: CookieService,
    public http: HttpClient,
    public router:Router
  ) { 
    this.getReUser()
  }

  public isEmpty(val: any) {
    const reg = /^\s+|\s+$/g;
    return (val == null || typeof val === 'string' && val.replace(reg, '').length == 0)
  }
  //下拉刷新
  doRefresh(e){
    this.getReUser();
    console.log(e)
    setTimeout(() => {
    e.target.disabled=!true;
    e.target.complete();
    }, 200);

  }

  //登录按钮事件
  onClickLogin() {


    if (this.isEmpty(this.loginInfo.username) || this.isEmpty(this.loginInfo.password)) {
      this.noplugService.alert("提示", "用户名、密码不能为空")
      return;
    }

    console.log("login ...ing")
    let api = "/user/login/"
    this.storage.get("userinfo").then(user=>{
      if(user!=null){
        this.storage.remove("userinfo")
      }
    })


    let data = this.http2Service.post(api, this.loginInfo)
    data.subscribe((a: any) => {
      if(a.code==200){
        let student = a.data;
        this.globalData.userId = student.id
        this.globalData.schoolid = student.schoolid
        this.globalData.shoolname = student.shoolname
        this.globalData.uid = student.uid
        this.globalData.useremail = student.useremail
        this.globalData.userheadimg = student.userheadimg
        this.globalData.username = student.username
        this.globalData.userphone = student.userphone
        this.globalData.usersignature = student.usersignature
        this.globalData.usertype = student.usertype
        this.globalData.artnum = student.artnum

        this.storage.set("userinfo",JSON.stringify(this.globalData))
        this.storage.get("re_name").then(name=>{
          if( name!=null ){
            this.storage.remove("re_name")
              
          }
        })
        this.storage.get("re_paw").then(paw=>{
          if( paw!=null ){
            this.storage.remove("re_paw")
          }
        })
        this.nav.navigateRoot(['tabs/tab1']);    
        this.noplugService.showToast("登录成功.....",2000,'top')
      }
      else{
        this.noplugService.alert(a.msg)
      }
      console.log(a)

    })
    
   

    


  }


  ngOnInit() {
    // this.router.onSameUrlNavigation='reload'
    console.log('Login page loaded');
  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.

  }
  getReUser(){
    this.storage.get("re_name").then(name=>{
      if( name!=null ){
        this.loginInfo.username= name;
          
      }
    })
    this.storage.get("re_paw").then(paw=>{
      if( paw!=null ){
        this.loginInfo.password= paw;
          
      }
    })
  }

  isExit = true;
  panduanExit(){
    if(this.isExit){
      this.noplugService.showToast("再按一次退出",2000,'top','success')
      this.isExit = false;
      setTimeout(() => {
        this.isExit = true;
      }, 2000);
    }
    else{      
      navigator['app'].exitApp(); //退出APP
    }
  }

}
