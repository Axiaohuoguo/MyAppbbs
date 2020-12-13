import { Component, OnInit } from '@angular/core';
import { Http2Service } from '../../services/MyHttp2.service'
import { GlobalData } from '../../provider/GlobalData'
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { NoplugService } from '../../provider/noplugService';
@Component({
  selector: 'app-applyfora',
  templateUrl: './applyfora.page.html',
  styleUrls: ['./applyfora.page.scss'],
})
export class ApplyforaPage implements OnInit {

  suinfo:any={
  userid:null,
  content:null
  }

  constructor(
    public http: Http2Service,
    public nav: NavController,
    public storage: Storage,
    public noplugService: NoplugService,
    ) { }

  ngOnInit() {
    this.getUser();

  }
    //获得当前用户信息
    getUser() {
      this.storage.get("userinfo").then(data => {
        if (data == null) {
          this.nav.navigateRoot(['./login']);
        }
        console.log(JSON.parse(data))
        this.suinfo.userid = JSON.parse(data)._userId  
         
      })
    }

  //提交申请
  onSubmit(){
    if((this.suinfo.content).length<6||(this.suinfo.content).length>23){
      this.noplugService.alert("6-23个字")
      return
    }
    let api = "/admin/applyadmin"
    this.http.post(api,this.suinfo).subscribe((res:any)=>{
      if(res.code ==200){
        this.noplugService.alert("提交成功等待审核...")
      }
      else{
        this.noplugService.alert(res.msg)
      }
    })
  }

}
