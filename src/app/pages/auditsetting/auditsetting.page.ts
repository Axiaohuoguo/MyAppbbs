import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Http2Service } from '../../services/MyHttp2.service'
import { NoplugService } from '../../provider/noplugService'
import { Storage } from '@ionic/storage'
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-auditsetting',
  templateUrl: './auditsetting.page.html',
  styleUrls: ['./auditsetting.page.scss'],
})
export class AuditsettingPage implements OnInit {
  tabState: any = 'dtsh'
  artList = []
  adminList = []
  isSuper: any = false
  userid:any;//当前用户id
  shoolid:any;//当前用户学校id
  constructor(
    public http: Http2Service,
    public storage: Storage,
    public noplugService: NoplugService,
    public nav: NavController,
  ) { }

  ngOnInit() {
    this.getUser().subscribe(user => {
      console.log(user)
      this.userid = user._userId
      this.shoolid = user._schoolid
      if (user._usertype == "999") {
        this.isSuper = true
        this.getAdminlist()
      }
      this.getArtList()

    })
  }
  //获得待审文章列表
  getArtList() {
    let api = "/admin/getshoolcheck"
    let par = {"shoolid":this.shoolid}
    this.http.get(api,par).subscribe((res:any)=>{
      console.log(res)
      this.artList = res.data;
    })

  }
  //通过审核
  onTongguoArt(e){
    console.log(e)
    let api = "/admin/artcheck"
    let par= {"myid":this.userid,"artid":e}
    this.http.get(api,par).subscribe((res:any)=>{
      if(res.code == 200){
        this.noplugService.alert(res.data)
        this.getArtList()
        return
      }
      else{
        this.noplugService.alert(res.msg)
      }
      
    })
  }
  onBohuiArt(e){
    console.log(e)
  }

  //获得待审管理列表
  getAdminlist() {
    let api = "/admin/getapplyadminlist"
    this.http.get(api).subscribe((res: any) => {
      console.log(res)
      this.adminList = res.data
    })
  }
  //通过管理审核
  onTongguoAdmin(e) {
    console.log(e)
    let api = "/admin/apply"
    let par = {"myid":this.userid,"taid":e}
    this.http.get(api,par).subscribe((res: any) => {
      console.log(res)
      if(res.code==200){
        this.noplugService.alert("操作成功")
        this.getAdminlist()
      }
      else{
        this.noplugService.alert(res.msg)
      }
    })
  }
  onBohuiAdmin(e) {
    console.log(e)
  }

  segmentChanged(e) {//top改变后的事件

    console.log('Segment changed', e.detail.value);
    this.tabState = e.detail.value;

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
