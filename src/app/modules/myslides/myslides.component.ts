
import { Component, OnInit,ViewChild} from '@angular/core';
import { MyrequestService } from '../../services/myrequest.service'

@Component({
  selector: 'app-myslides',
  templateUrl: './myslides.component.html',
  styleUrls: ['./myslides.component.scss'],
})
export class MyslidesComponent implements OnInit {

  slideImgSrc:any =[] //轮播列表
    //轮播的属性
    @ViewChild('slide1', null) slide1: any;

    slidesOpts = {
      effect: 'flip',//轮播效果
      autoplay: {
        delay: 1000,
      },
      loop: true
    };

  constructor(public myrequestService: MyrequestService) {

    this.slideImgSrc = this.myrequestService.slideImgSrcList; //获取图片列表
  }


 ngOnInit() {
  
  
  console.log(this.slideImgSrc)

 }



  //手动滑动后轮播图不自动轮播的解决方法
  slideDidChange(){

    console.log(' this.slide1' ,this.slide1);
    
    this.slide1.nativeElement.startAutoplay();

  }



}
