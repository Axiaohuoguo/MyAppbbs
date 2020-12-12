import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Http2Service } from '../../services/MyHttp2.service'
import {APP_SERVE}from '../../provider/constant'
import { Storage } from '@ionic/storage'
import { NoplugService } from '../../provider/noplugService';

@Component({
  selector: 'app-publishlistmdal',
  templateUrl: './publishlistmdal.component.html',
  styleUrls: ['./publishlistmdal.component.scss'],
})
export class PublishlistmdalComponent implements OnInit {

  typeList:any=[];//类别列表
  app_url:string =APP_SERVE; //服务器地址

  constructor(
    public navParams:NavParams,
    public modalController:ModalController,
    public http2Service:Http2Service,
    public storage:Storage,  
    public noplugService:NoplugService  
    ) { }

  ngOnInit() {
    console.log(this.navParams)    
    this.getAllType();
    this.setIsOpenMod()
  }
  //设置打开模态框的标志
  setIsOpenMod(){
    this.storage.set("isOpenMod",true)
  }
  //获得所有可用帖子类别
  getAllType(){
    let api  = '/art/gettype'
    this.http2Service.get(api).subscribe((res:any)=>{
      console.log(res)      
      this.typeList = res.data;
      this.storage.get('typeinfo').then(typeinfo=>{
        //防止缓存时不更新
        if(typeinfo!=''||typeinfo!=null){
          this.storage.remove('typeinfo');
          this.storage.set('typeinfo',res.data);
        }
        else{
          this.storage.remove('typeinfo');
        }
        
      })
     
    })
  }
  ionViewWillLeave(){
    console.log("关闭模态框");
    this.storage.remove("isOpenMod")
  }
  doClose(){
    this.storage.remove("isOpenMod")
    console.log("关闭模态框");
    this.modalController.dismiss({
      'closeValue':"值" //关闭时传递的数据

    });
  }

}
