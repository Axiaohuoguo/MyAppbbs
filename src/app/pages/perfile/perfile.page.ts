import { Component, OnInit } from '@angular/core';
import { Http2Service } from '../../services/MyHttp2.service'
import { NoplugService } from '../../provider/noplugService'
import { Storage } from '@ionic/storage'
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

  butFlag: any = true//ta的账号是否可用

  public isFollow: any = false
  public tuserid: any //ta的id
  public myuserid: any // 当前用户id
  isAdmin: boolean = false //当前用户是否是999管理

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
    this.getUser().subscribe(data => {
      // console.log(data)
      this.myuserid = data._userId
      if (data._usertype == "999") {
        this.isAdmin = true
      }
      if (data != null) {
        this.isFollowT(this.myuserid, this.tuserid)

      }
    })


  }

  //当前用户是否关注ta
  isFollowT(myid, taid) {
    let api = "/user/isfollow"
    let par = { "myid": myid, "taid": taid }
    this.http.get(api, par).subscribe((res: any) => {
      // console.log(res)
      this.isFollow = res.data.state
    })
  }
  // 冻结/解封 ta的账号
  onFreezeta() {
    let a = ""
    if (this.butFlag) {
      a = "禁用"
    } else { a = "激活" }
    this.noplugService.alertIscontinue("警告", "是否" + a + "Ta的账号", ca => {
      if (ca) {
        this.butFlag = !this.butFlag
        let api = "/admin/forbidden";
        let par = { "myid": this.myuserid, "taid": this.tuserid }
        this.http.get(api, par).subscribe((res: any) => {
          if (res.code == 200) {
            this.noplugService.alert(res.data.msg)
          }
          else {
            this.noplugService.alert(res.msg)
          }
        })
      }
      else return
    })

  }
  // 关注
  onFollow() {
    let api = "/user/follow"
    let par = { "myid": this.myuserid, "taid": this.tuserid }
    this.http.get(api, par).subscribe((res: any) => {
      console.log(res)
      if (res.code == 200) {
        this.noplugService.alert("关注成功")
        this.isFollow = !this.isFollow
      }
      else {
        this.noplugService.alert(res.msg)
      }
    })


  }
  //取消关注
  onnuFollow() {

    let api = "/user/unfollow"
    let par = { "myid": this.myuserid, "taid": this.tuserid }
    this.http.get(api, par).subscribe((res: any) => {
      console.log(res)
      if (res.code == 200) {
        this.noplugService.alert("取消关注成功")
        this.isFollow = !this.isFollow
      }
      else {
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
        let infoa = re.data

        infoa.userpassword = ''
        infoa.userphone = ''
        return infoa
      })

    ).subscribe(a => {
      console.log(a)
      if (a.usertype == '-1') {
        this.butFlag = false;
      }

      else {
        this.butFlag = true;
      }
      this.userInfo = a

    })

  }








}
