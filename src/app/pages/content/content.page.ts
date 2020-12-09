import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http2Service } from '../../services/MyHttp2.service'
import { NoplugService } from '../../provider/noplugService'
import { Storage } from '@ionic/storage'
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {

  public tabState = "reply"
  private artid: any // 当前文章id
  replyBut: any = false//是否显示回复
  isLike: any   //当前用户是否对该文章点赞
  likeClass: any = "" //点赞图标样式
  //回复内容 
  replyInfo: any = {
    artId: -1,
    replyContent: "",
    replyUserId: -1
  }
  //当前文章的回复 列表
  dArtReplyinfo: any = []

  //当前文章的点赞 列表
  dArtLikeinfoList: any = []

  //文章信息
  public articleInfo: any = {
    arttitle: null,//标题
    username: null,//作者
    userheadimg: null,
    arttime: null,
    artSee: null,//阅读量
    titleImg: null,//头部的图片
    artcontent: null,
    likenum: null,
    replynum: null
  }

  constructor(
    public routerinfo: ActivatedRoute,
    public http: Http2Service,
    public storage: Storage,
    public noplugService: NoplugService,
    public nav: NavController,
  ) {
  }

  //回复图标
  onArtreply() {
    console.log(this.replyBut)
    this.replyBut = !this.replyBut;
  }
  //从后台判断文章是否被当前用户点赞了
  getIsLike(artid, userid) {
    let api = "/art/getislike"
    let par = {
      artid: artid,
      userid: userid
    }
    this.http.get(api, par).subscribe(((res: any) => {
      console.log("==是否点赞==", res.data.islike)
      this.isLike = res.data.islike
      this.setLikeBut()

    }))

  }
  //获得文章的点赞列表
  getArtLikeList(artid){
    let api = "/art/getlikelist"
    let par = {"artid":artid}
    this.http.get(api,par).subscribe(((res:any)=>{
      this.dArtLikeinfoList = res.data
      console.log(res)
    }))
  }

  //点赞
  onArtLike() {
    this.isLike = !this.isLike;
    let par = {
      artid: this.replyInfo.artId,
      userid: this.replyInfo.replyUserId
    }
    let api = "/art/like"
    this.http.get(api, par).subscribe(((res: any) => {
      console.log("==点赞==", res)

      this.getarticleInfo(this.artid)
      this.getArtLikeList(this.artid)
      this.noplugService.showToast(res.data.msg, 200, "top")
    }))
    this.setLikeBut()
  }
  //提交回复
  onReply() {
    console.log(this.replyInfo)
    // this.replyBut = !this.replyBut;
    let api = "/art/replyart"
    this.http.post(api, this.replyInfo).subscribe((res: any) => {
      console.log(res)
      if (res.code == 200) {
        this.noplugService.showToast("回复成功", 300, "top")
        this.replyInfo.replyContent = ''
        this.getReplyinfoByArtid(this.artid)
        this.getarticleInfo(this.artid)
        this.replyBut = !this.replyBut;
      }
    })
  }
  //获得当前文章的回复
  getReplyinfoByArtid(id: Number) {
    let par = { "artid": id }

    let api = "/art/getreplylist"
    this.http.get(api, par).subscribe((res: any) => {
      console.log(res)
      this.dArtReplyinfo = res.data;
    })
  }

  public rTime(date) {
    // let dat = Date.parse(date)    
    let da = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    return da
  }
  //设置点赞按钮状态
  setLikeBut() {
    if (this.isLike) {
      this.likeClass = "thumbs-up"
    }
    else {
      this.likeClass = "thumbs-up-outline"
    }
  }
  ngOnInit() {
    this.artid = this.routerinfo.snapshot.params['artid']
    console.log("传过来的artid", this.artid);
    this.getarticleInfo(this.artid)
    this.getUser()
    this.getReplyinfoByArtid(this.artid)
    this. getArtLikeList(this.artid)
    console.log("==页面启动时==", this.isLike)

  }

  //获得当前用户信息
  getUser() {
    this.storage.get("userinfo").then(data => {
      if (data == null) {
        this.nav.navigateRoot(['./login']);
      }
      console.log(JSON.parse(data))
      this.replyInfo.replyUserId = JSON.parse(data)._userId

      this.getIsLike(this.artid, JSON.parse(data)._userId)

    })
  }
  //通过id获取文章
  getarticleInfo(id) {

    let api = "/art/getartinfobyid"
    let par = { "id": id }
    this.http.get(api, par).subscribe((res: any) => {
      this.articleInfo = res.data
      this.articleInfo.arteditime = this.rTime(res.data.arteditime)
      this.replyInfo.artId = res.data.id;
      // console.log(this.rTime(res.data.arteditime))
      console.log(this.articleInfo)

    })
  }

  segmentChanged(e) {//top改变后的事件

    console.log('Segment changed', e.detail.value);
    this.tabState = e.detail.value;

  }

}
