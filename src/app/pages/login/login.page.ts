import { Component, OnInit } from '@angular/core';


// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; //imports
// import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  static isRemember:boolean;
  
  loginInfo :any={
    username :'',
    password:'',
    isRemember:true
  }

  
// eye-off-outline <ion-icon name="eye-outline"></ion-icon>
isShowflage = false;
isShow:string = "eye-off-outline"

isPas:string = "password"
isShowClick(){

  this.isShowflage = !this.isShowflage;
  if(!this.isShowflage){
    this.isShow = "eye-outline";
    this.isPas = "text"
  }
  else{
    this.isShow = "eye-off-outline"
    this.isPas = "password"
    
  }
}
  constructor() {}





  submitLogin() 
  {
      console.log('Doing login..');
  }


  ngOnInit() {
   
    console.log('Login page loaded');


  }

}
