import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  
  version:any
  constructor(public appVersion: AppVersion) { }

  ngOnInit() {
    this.appVersion.getVersionNumber().then((value: any) => {
      console.log(value)
      this.version = value
    }).catch(err => {
      console.log('getVersionNumber:' + err);
    });


  }

}
