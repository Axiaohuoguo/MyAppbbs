import { Component, OnInit } from '@angular/core';
import { Http2Service } from '../services/MyHttp2.service'
import { GlobalData } from '../provider/GlobalData'
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { NoplugService } from '../provider/noplugService';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})

export class Tab4Page implements OnInit {


  userInfo: any = {
  }
  constructor(
    public http2Service: Http2Service,
    public globalData: GlobalData,
    public nav: NavController,
    public storage: Storage,
    public noplugService: NoplugService
  ) { }

  ngOnInit() {
    this.verif()
  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    
  }


  /**
   * 验证
   */
  verif() {
    this.storage.get("userinfo").then(userinfo => {
      if (userinfo == '' || userinfo == null) {
        this.nav.navigateRoot(['./login'])
        this.noplugService.alert("登录过期请重新登录")
      }
      else {
        this.userInfo = JSON.parse(userinfo)

        console.log(this.userInfo)
      }

    })
   
  }

}
