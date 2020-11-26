import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage implements OnInit {
  private artid

  public articleInfo:any //文章信息
  public tabState = "reply"

  constructor( public routerinfo:ActivatedRoute) { }

  ngOnInit() {
    this.artid=this.routerinfo.snapshot.params['artid']
    console.log("传过来的artid",this.artid);
    this.getarticleInfo(this.artid)
  }
  getarticleInfo(id){
    
    this.articleInfo={
      artTitle:"Tab图标的使用",//标题
      artAuthor:"小火锅",//作者
      artHead:"./assets/images/head2.png",
      artTime:"2020-10-22 17:06",
      artSee:"22",//阅读量
      titleImg:"../../assets/02.jpg",//头部的图片
      artContent:[
        {contentP:'tab图标，其实就是两个图标，一个填充的和一个outline的。通过样式来切换。',contentImg:'../../assets/03.jpg'},
        {contentP:'实就是两个图标，一个填充的和一实就是两个图标，一个填充的和一实就是两个图标，一个填充的和一实就是两个图标，一个填充的和一',contentImg:'../../assets/04.jpg'},
        {contentP:'实就是两个图标，一个填充的和一',contentImg:''}
      ]

    }
  }

  segmentChanged(e) {//top改变后的事件

    console.log('Segment changed',e.detail.value);
    this.tabState =e.detail.value;

  }

}
