import { Component } from '@angular/core';
import { Http2Service } from '../services/MyHttp2.service'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  options:any={
  }
  constructor(
    public http2Service:Http2Service,
    public storage:Storage
    ) {
      

  }
  ngOnInit(): void {

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  // let api = "/user/verification";
  // let pdata = this.http2Service.get(api)
  // pdata.subscribe((data)=>{

  //   console.log(data)
  // })

  }

}
