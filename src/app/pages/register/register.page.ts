import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  reForm: FormControl;

  //验证码倒计时 全局定义变量
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 10,//总共时间
    disable: true
  };

 public registerInfo:any ={
    name:'',
    passwod:'',
    repasswod:'',
    phone:'',
    vcode:'',
    email:''
  }

  constructor() { }

  ngOnInit() {

  }
  regOnClick(){
    console.log("registerInfo",this.registerInfo);
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
