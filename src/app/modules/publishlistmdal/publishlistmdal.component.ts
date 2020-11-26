import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-publishlistmdal',
  templateUrl: './publishlistmdal.component.html',
  styleUrls: ['./publishlistmdal.component.scss'],
})
export class PublishlistmdalComponent implements OnInit {

  constructor(
    public navParams:NavParams,
    public modalController:ModalController
    
    ) { }

  ngOnInit() {
    console.log(this.navParams)
  }
  doClose(){
    console.log("关闭模态框");
    this.modalController.dismiss({
      'closeValue': "closeTest" //关闭时传递的数据
    });
  }

}
