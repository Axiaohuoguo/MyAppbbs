import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyrequestService {

  constructor() { }

  url :string = 'http://'
  //轮播图片列表
  slideImgSrcList = [
    'assets/01.jpg',
    'assets/02.jpg',
    'assets/03.jpg',
    'assets/04.jpg'
  ];
  

}
