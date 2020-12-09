import { Component } from '@angular/core';
import { Http2Service } from '../services/MyHttp2.service'
import { Storage } from '@ionic/storage'
import { APP_SERVE } from '../provider/constant';
import { NoplugService } from '../provider/noplugService';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  typeList: any = [];//类别列表
  app_url: string = APP_SERVE; //服务器地址
  options: any = {
  }
  constructor(
    public http2Service: Http2Service,
    public storage: Storage,
    public noplugService:NoplugService
  ) {


  }
  // 下拉刷新
  doRefresh(e) {
    setTimeout(() => {
      this.getAllType(e)
      e.target.disabled = !true;
    }, 1000);



  }
  //获得所有可用帖子类别
  getAllType(e) {
    let api = '/art/gettype'
    this.http2Service.get(api).subscribe((res: any) => {
      console.log(res)
      this.typeList = res.data;
      if (e != null) {
        e.target.complete();
      }


      this.storage.get('typeinfo').then(typeinfo => {
        //防止缓存时不更新
        if (typeinfo != '' || typeinfo != null) {
          this.storage.remove('typeinfo');
          this.storage.set('typeinfo', res.data);
        }
        else {
          this.storage.remove('typeinfo');
        }

      })

    })
  }
  ngOnInit(): void {

    this.getAllType(null);
  }
 

}
