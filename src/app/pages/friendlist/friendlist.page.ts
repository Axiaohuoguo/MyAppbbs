import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http2Service } from '../../services/MyHttp2.service'
import { NoplugService } from '../../provider/noplugService'
import { Storage } from '@ionic/storage'
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.page.html',
  styleUrls: ['./friendlist.page.scss'],
})
export class FriendlistPage implements OnInit {
  flag: String;
  public myuserid: any // 当前用户id
  isfollowPage :boolean;
  userList:any =[]
  constructor(
    public routerinfo: ActivatedRoute,
    public http: Http2Service,
    public storage: Storage,
    public noplugService: NoplugService,
    public nav: NavController,
  ) { }

  ngOnInit() {
    this.flag = this.routerinfo.snapshot.params['flag']
    this.getUser().subscribe(dat=>{
      if(dat!=null){
        if (this.routerinfo.snapshot.params['flag'] == 'follow') {
          this.getfollowlist(dat._userId)
          this.isfollowPage = true
        }
        if (this.routerinfo.snapshot.params['flag'] == 'fans') {
          this.getfanslist(dat._userId)
          this.isfollowPage = false
        }
      }
      else this.nav.navigateRoot(['./login'])
    })

  }
  getfollowlist(id) {
    let api = "/user/getfollowlist"
    let par = {"myid":id}
    this.http.get(api,par).subscribe((res:any)=>{
      console.log(res)
      this.userList = res.data
    })
  }
  getfanslist(id){
    let api = "/user/getfanslist"
    let par = {"myid":id}
    this.http.get(api,par).subscribe((res:any)=>{
      console.log(res)
      this.userList = res.data
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

}
