import { Component, OnInit } from '@angular/core';
import { Http2Service } from '../../services/MyHttp2.service'
import { NoplugService } from '../../provider/noplugService'
import { Storage } from '@ionic/storage'
import { QNY_SERVER } from '../../provider/constant';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map, filter } from 'rxjs/operators' // 工具
@Component({
  selector: 'app-perfile',
  templateUrl: './perfile.page.html',
  styleUrls: ['./perfile.page.scss'],
})

export class PerfilePage implements OnInit {

  public isFollow:any = false
  public tuserid: any //ta的id
  public myuserid: any // 当前用户id

  public userInfo: any = {
    id: -1,
    uid: -1,
    useremail: 'null',
    userheadimg: '',
    username: 'null',
    usersignature: 'null',
  }

  constructor(
    public noplugService: NoplugService,
    public http: Http2Service,
    public storage: Storage,
    public nav: NavController,
    public routerinfo: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.tuserid = this.routerinfo.snapshot.params['userid']

    this.getUserInfoByUserId(this.routerinfo.snapshot.params['userid'])
    this.getUser().subscribe(data=>{
      // console.log(data)
       this.myuserid = data._userId
       if(data != null){
        this.isFollowT(this.myuserid,this.tuserid)

       }
    })
    

  }

  //当前用户是否关注ta
  isFollowT(myid,taid){
    let api = "/user/isfollow"
    let par = {"myid":myid,"taid":taid}
    this.http.get(api,par).subscribe((res:any)=>{
      // console.log(res)
      this.isFollow = res.data.state
    })
  }
  // 关注
  onFollow(){
    let api = "/user/follow"
    let par = {"myid":this.myuserid,"taid":this.tuserid}
    this.http.get(api,par).subscribe((res:any)=>{
      console.log(res)
      if(res.code == 200){
        this.noplugService.alert("关注成功")
        this.isFollow = !this.isFollow
      }
      else{
        this.noplugService.alert(res.msg)
      }
    })
    
    
  }
  //取消关注
  onnuFollow(){
   
    let api = "/user/unfollow"
    let par = {"myid":this.myuserid,"taid":this.tuserid}
    this.http.get(api,par).subscribe((res:any)=>{
      console.log(res)
      if(res.code == 200){
        this.noplugService.alert("取消关注成功")
         this.isFollow = !this.isFollow
      }
      else{
        this.noplugService.alert(res.msg)
      }
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

      })

    })
  }

  getUserInfoByUserId(uiserid) {
    let api = "/user/getuserinfobyuserid"
    let par = { "userid": uiserid }
    let data = this.http.get(api, par)
    data.pipe(

      map((re: any) => {
        let  infoa = re.data
        
        infoa.userpassword = '' 
        infoa.userphone='' 
        return infoa      
      })

    ).subscribe(a=>{
     this.userInfo = a

    })

  }








}
