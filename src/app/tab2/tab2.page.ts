import { Component, ViewChild } from '@angular/core';
import { PAGE_SIZE } from '../provider/constant'
import { Http2Service } from '../services/MyHttp2.service'
import { NoplugService } from '../provider/noplugService'
import { Storage } from '@ionic/storage'
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators' // 工具
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public artList: any = []//文章列表
  public lenth;//当前数据条数
  public dis: any = false //是否还显示"加载更多
  public defaultArtImg = "../../assets/images/head1.png" //卡片默认图片
  public tabState: any = "all";
  public schoolId: Number;
  public param: any = {
    page: 1,
    size: PAGE_SIZE,
    schoolid: null
  }
  //top栏dom
  @ViewChild('segment1', null) segment1: any;

  constructor(
    public http: Http2Service,
    public storage: Storage,
    public noplugService: NoplugService,
    public nav: NavController,
  ) {

  }
  // 下拉刷新
  doRefresh(e) {
   
    if (this.tabState == "all") {
      this.param.page = 1;
      
      setTimeout(() => {
        this.artList = []
        this.getArtListByschoolID(this.param, e)
      }, 1000);
      // return;
    }

    // e.target.disabled=!true;
    // e.target.complete();


  }

  ngOnInit(): void {

    this.getDefault()

  }

  getDefault() {

    this.getSchoolid().subscribe((res: Number) => {
      console.log(res)
      if (res != null) {
        this.param.schoolid = res
        this.getArtListByschoolID(this.param, null)
      }
    })
  }

  //获得当前登录用户的学校id
  getSchoolid(): Observable<any> {
    return new Observable(obser => {

      this.storage.get("userinfo").then((dat: any) => {
        if (dat == null) {
          obser.error()
          this.nav.navigateRoot(['./login']);
        }
        obser.next(JSON.parse(dat)._schoolid)
      })

    })


  }

  //去掉文字中的html标签
  atchReg(str) {
    let reg = /<\/?.+?\/?>/g;
    return this.retainNmb(str.replace(reg, ''), 30)
  }

  fondImgHtml(str: String) {
    let oneIndex = str.search("src=\"")
    if (oneIndex != -1) {
      // let lastIndex = str.substring(oneIndex).search("\">")
      let imgUrl = str.substring(oneIndex + 5)
      let lastIndex = imgUrl.search("\">")
      return imgUrl.substring(0, lastIndex)
    }
    return "-1"
  }

  //保留多少文字
  retainNmb(str: String, num: number) {

    return str.substr(1, num)+"......";

  }

  //通过学校id获得动态列表
  getArtListByschoolID(param, e) {
    let api = "/art/selectartlist"
    let dat = this.http.get(api, param)

    dat.pipe(
      map((re: any) => {
        console.log(re.data)

        for (let index = 0; index < re.data.length; index++) {
          let imgurl = this.fondImgHtml(re.data[index].artcontent)

          if (imgurl != "-1") {
            re.data[index].defaultArtImg = imgurl;
          }
          else {
            re.data[index].defaultArtImg = this.defaultArtImg
          }
          re.data[index].artcontent = this.atchReg(re.data[index].artcontent)
        }
        return re
      })
    )
      .subscribe((res: any) => {
        this.lenth = res.data.length;
        if(e == null){
          this.dis = false;
  
        }
        if (e != null) {
          e.target.complete();
        }
        if (e != null && res.data.length < PAGE_SIZE) {
          console.log("我也是有底线的..")
          this.dis = true;
          // e.target.disabled = true;
          // e.target.complete();          
        }
        for (let index = 0; index < res.data.length; index++) {
          this.artList.push(res.data[index])
        }
        // this.artList = res.data;

        console.log(res)

      })

  }

  segmentChanged(e) {//top改变后的事件

    console.log('Segment changed', e.detail.value);
    this.tabState = e.detail.value;

  }

  //加载更多
  loadData(e) {
    console.log(this.param)
    console.log("------------")
    console.log(e);
    this.param.page++
    this.getArtListByschoolID(this.param, e)

  }


}
