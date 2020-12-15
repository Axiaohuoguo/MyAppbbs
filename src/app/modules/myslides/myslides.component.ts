
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http2Service } from '../../services/MyHttp2.service'

@Component({
  selector: 'app-myslides',
  templateUrl: './myslides.component.html',
  styleUrls: ['./myslides.component.scss'],
})
export class MyslidesComponent implements OnInit {

  slideImgSrc: any = [] //轮播列表
  //轮播的属性
  @ViewChild('slide1', null) slide1: any;

  slidesOpts = {
    effect: 'flip',//轮播效果
    autoplay: {
      delay: 2500,
    },
    loop: true
  };

  constructor(public http:Http2Service) {


  }
  //获取图片列表
  getslideImglist() {
    this.slideImgSrc =[
      '../assets/001.png'
    ,'../assets/002.png'
    ,'../assets/003.png'
    ,'../assets/004.png' ]

  }

  ngOnInit() {


    console.log(this.slideImgSrc)
    this.getslideImglist();

  }



  //手动滑动后轮播图不自动轮播的解决方法
  slideDidChange() {

    console.log(' this.slide1', this.slide1);

    this.slide1.nativeElement.startAutoplay();

  }



}
