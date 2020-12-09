import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'
import { Http2Service } from '../../services/MyHttp2.service'
import { NoplugService } from '../../provider/noplugService'
import { GlobalData } from '../../provider/GlobalData';
import { LoadingController, NavController } from '@ionic/angular';
import { PAGE_SIZE } from '../../provider/constant';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-myartlist',
  templateUrl: './myartlist.page.html',
  styleUrls: ['./myartlist.page.scss'],
})
export class MyartlistPage implements OnInit {

  public lenth;//当前数据条数
  public dis: any = false //是否还显示"加载更多
  public artList: any = []
  public param: any = {
    page: 1,
    size: PAGE_SIZE * 2,
    userid: null
  }
  constructor(
    public nav: NavController,
    public storage: Storage,
    public http: Http2Service,
    public noplugService: NoplugService,
    public globalData: GlobalData,
    public Loading: LoadingController
  ) { }

  ngOnInit() {
    this.getDefault()

  }


  getMyArtlistByuserid(param, e) {
    let api = "/art/selecartlistbyuserid"
    this.http.get(api, param).subscribe((res: any) => {
      this.lenth = res.data.length;
      if (e != null) {
        e.target.complete();
      }
      if (res.data.length < PAGE_SIZE) {
        console.log("我也是有底线的..")
        this.dis = true;
        e.target.disabled = true;
        // e.target.complete();          
      }
      for (let index = 0; index < res.data.length; index++) {
        this.artList.push(res.data[index])
      }
      // this.artList = res.data;

      console.log(res)

    })


  }
  //默认数据
  getDefault() {
    this.getUserId().subscribe((res: Number) => {
      console.log("----------", res)

      if (res != null) {
        this.param.userid = res
        this.getMyArtlistByuserid(this.param, null)
      }
    })
  }
  //当前用户id
  getUserId(): Observable<any> {
    return new Observable(obser => {

      this.storage.get("userinfo").then((dat: any) => {
        if (dat == null) {
          obser.error()
          this.nav.navigateRoot(['./login']);
        }
        obser.next(JSON.parse(dat)._userId)
      })

    })


  }
  //删除按钮
  onDelete(e) {
    this.noplugService.alertIscontinue("删除!", "确定删除此条帖子", call => {
      if (call) {
        let api = "/art/deleteartbyid"
        let par = { "artid": e }

        this.http.get(api, par).subscribe((res: any) => {
          console.log(res)

          if (res.code == 200) {

            for (let index = 0; index < this.artList.length; index++) {
              if (this.artList[index].id == e) {
                this.artList.splice(index, 1)
              }

            }
            this.noplugService.alert("删除成功")

            return
          } else {
            this.noplugService.alert(res.msg)
            return
          }

        })

      }
      else {
        return;
      }
    })
  }

  //加载更多
  loadData(e) {
    console.log(this.param)
    console.log("------------")
    console.log(e);
    this.param.page++
    this.getMyArtlistByuserid(this.param, e)

  }

  //刷新
  doRefresh(e) {
    this.param.page = 1;
    setTimeout(() => {
      this.artList = []

      this.getMyArtlistByuserid(this.param, e)

      e.target.disabled = !true;
      e.target.complete();
    }, 1000);




  }
}
