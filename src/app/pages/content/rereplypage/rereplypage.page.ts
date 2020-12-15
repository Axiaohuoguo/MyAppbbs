import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http2Service } from '../../../services/MyHttp2.service'
import { NoplugService } from '../../../provider/noplugService'
import { Storage } from '@ionic/storage'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-rereplypage',
  templateUrl: './rereplypage.page.html',
  styleUrls: ['./rereplypage.page.scss'],
})
export class RereplypagePage implements OnInit {

  replyid // 当前回复的id
  RrRepylylist:any =[]
  isRe = false;
  rereplyInfo:any={
    replyid:-1,
    content: null,
    userid:null
}

  constructor(
    public routerinfo: ActivatedRoute,
    public http: Http2Service,
    public storage: Storage,
    public noplugService: NoplugService,
    public nav: NavController,
  ) { 

  }

  ngOnInit() {
    this.replyid = this.routerinfo.snapshot.params['reid']
    this.getRrRepylylist(this.replyid)
    this.getUser()
  }
  //获得列表
  getRrRepylylist(id){
    let api  ="/art/getrereplylist"
    let par = {"replyid":id}
    this.http.get(api,par).subscribe((res:any)=>{
      if((res.data).length == 0){
        this.isRe = true
      }
      // console.log(res)
      this.RrRepylylist = res.data;
    })

  }
    //获得当前用户信息
    getUser() {
      this.storage.get("userinfo").then(data => {
        if (data == null) {
          this.nav.navigateRoot(['./login']);
        }
        console.log(JSON.parse(data))
        this.rereplyInfo.userid = JSON.parse(data)._userId  
      })
    }
  // 提交回复的回复
  onreReply(){   
    if((this.rereplyInfo.content).length<5||(this.rereplyInfo.content).length>50){
      this.noplugService.alert("评论字数5-50字之间")      
      return
    }
    this.rereplyInfo.replyid = this.replyid
    let api ="/art/rereply"
    this.http.post(api,this.rereplyInfo).subscribe((res:any)=>{
      if(res.code == 200){
        this.noplugService.showToast("回复成功！",300, "top")
        this.isRe = false
        this.rereplyInfo.content = ''
        this.getRrRepylylist(this.replyid)
      }
      else{
        this.noplugService.alert(res.msg)
      }
    })

  }


}
