import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Http2Service } from '../../services/MyHttp2.service'
import { NoplugService } from '../../provider/noplugService'
import { Storage } from '@ionic/storage'
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {

  constructor(
    public http2Service: Http2Service,
    public noplugService: NoplugService,
    public storage:Storage,
    public nav:NavController,
  ) { }

  scoolList: any = [];
  reForm: FormControl;
  bak:boolean=false;

  //验证码倒计时 全局定义变量
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,//总共时间
    disable: true
  };

  public registerInfo: any = {
    username: '',
    password: '',
    repassword: '',
    phone: '',
    vcode: '',
    email: '',
    schoolid: 57
  }



  ngOnInit() {
    let api = "/user/getallschool"
    let da = this.http2Service.get(api)
    da.subscribe((data: any) => {

      this.scoolList = data.data

      console.log(data.data)
    })



  }
  public isEmpty(val: any) {
    const reg = /^\s+|\s+$/g;
    return (val == null || typeof val === 'string' && val.replace(reg, '').length == 0)
  }
  regOnClick() {
    //注册事件
    let reg = /^[0-9a-zA-Z]+@(([0-9a-zA-Z]+)[.])+[a-z]{2,4}$/i;
    if (this.isEmpty(this.registerInfo.username) || this.isEmpty(this.registerInfo.password)) {
      this.noplugService.alert("提示", "用户名、密码不能为空")
      return;
    }
    if (this.isEmpty(this.registerInfo.phone) || this.isEmpty(this.registerInfo.email)) {
      this.noplugService.alert("提示", "手机、邮箱不能为空")
      return;
    }
    if (!reg.test(this.registerInfo.email)){
      this.noplugService.alert("提示","邮箱格式不正确");
      return;
    }
    if((this.registerInfo.phone+"").length != 11 ){
      this.noplugService.alert("提示","电话格式不正确");
      return;
    }
    if(this.registerInfo.password != this.registerInfo.repassword){
      this.noplugService.alert("提示","两次密码不一致");
      return;
    }
    if((this.registerInfo.username).length<5){
      this.noplugService.alert("提示","用户名太短了...");
      return;
    }
    let api = "/user/register"
    let data = this.http2Service.post(api, this.registerInfo)
    data.subscribe((res:any) => {
      console.log(res)
      if(res.code!=200){
        this.noplugService.alert("提示",res.msg)
        return;
      }
      else{
        this.storage.set("re_name",this.registerInfo.username)
        this.storage.set("re_paw",this.registerInfo.password)
        this.noplugService.showToast("注册成功..");
        this.bak = !this.bak;
      }

    })


    console.log("registerInfo", this.registerInfo);
  }

  //获取验证码的方法
  getCode() {
    if (!this.verifyCode.disable) {
      console.log("操作频繁")
      return;
    }
    console.log("=====")
    //每次点击时初始化
    this.verifyCode.disable = false;
    this.settime()
  }

  //倒计时
  settime() {
    if (this.verifyCode.countdown == 0) {
      this.verifyCode.verifyCodeTips = "获取验证码";
      this.verifyCode.disable = true;
      return;
    } else {
      this.verifyCode.countdown--;
    }
    setTimeout(() => {
      this.verifyCode.verifyCodeTips = "重新获取" + this.verifyCode.countdown + "秒";
      this.settime();
    }, 1000);
  }


}
