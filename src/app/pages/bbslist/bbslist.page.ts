import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http2Service } from '../../services/MyHttp2.service'
import { NoplugService } from '../../provider/noplugService'
import { Storage } from '@ionic/storage'
import { NavController } from '@ionic/angular';
import { PAGE_SIZE } from '../../provider/constant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bbslist',
  templateUrl: './bbslist.page.html',
  styleUrls: ['./bbslist.page.scss'],
})

export class BbslistPage implements OnInit {

  public param: any = {
    page: 1,
    size: PAGE_SIZE,
    schoolid: null,
    typeid: null
  }
  public artList: any = []//文章列表
  public lenth;//当前数据条数
  public dis: any = false //是否还显示"加载更多
  public defaultArtImg = "../../assets/images/head1.png" //卡片默认图片

  title: any = ""
  pageType = ""
  tabState: any = "all";
  typePage = ""// 判断是搜索过来的还是 分类过来的
  key = ""// 参数
  schoolid: any = -1
  typeid: any
  constructor(
    public routerinfo: ActivatedRoute,
    public http: Http2Service,
    public storage: Storage,
    public noplugService: NoplugService,
    public nav: NavController,
  ) { }

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

    return str.substr(1, num) + "......";

  }

  ngOnInit() {
    this.typePage = this.routerinfo.snapshot.params['flag']
    this.key = this.routerinfo.snapshot.params['key']
    this.param.page = 1

    if (this.typePage == "type") { // 如果是通过类别查询
      console.log("通过类别")
      this.param.typeid = this.key

      this.getDefaultTypeList()

    }
    else if (this.typePage == "search") { //通过搜索

    }
    else {
      this.nav.navigateRoot(['/'])
    }
    console.log(this.typePage, this.key)
  }

  //搜索,page,size
  searchArt() {

  }

  //获得默认数据-Type
  getDefaultTypeList() {
    this.getSchoolid().subscribe((res: Number) => {
      console.log(res)
      if (res != null) {
        this.param.schoolid = res

        this.getArtListByClassid(this.param, null)
      }
    })
  }

  //通过类别id ,page,size 获取 
  getArtListByClassid(par, e) {
    let api = "/art/selectartlistbytypeid"
    let data = this.http.get(api, par)

    
    data.pipe(
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
        if (e != null) {
          e.target.complete();
        }
        if (e != null && res.data.length < PAGE_SIZE) {
          console.log("我也是有底线的..")
          this.dis = true;
          e.target.disabled = !true;
          // e.target.complete();          
        }
        for (let index = 0; index < res.data.length; index++) {
          this.artList.push(res.data[index])
        }
        // this.artList = res.data;

        console.log(res)

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
  // 下啦刷新
  doRefresh(e){
    
    if (this.tabState == "all") {
      this.param.page = 1;
      setTimeout(() => {
        this.artList = []
        this.getArtListByClassid(this.param, e)
      }, 500);
      return;
    }

    e.target.disabled=!true;
    e.target.complete();
  }
  // 上拉加载
  loadData(e){
    this.param.page++
    this.getArtListByClassid(this.param, e)

  }

}
