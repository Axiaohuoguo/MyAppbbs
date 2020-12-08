import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { Http2Service }from '../../services/MyHttp2.service'

import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileUploadAdapter } from '../../services/FileUploadAdapter'
import { NoplugService }  from '../../provider/noplugService'

@Component({
  selector: 'app-pulishoredit',
  templateUrl: './pulishoredit.page.html',
  styleUrls: ['./pulishoredit.page.scss'],
})
export class PulishoreditPage implements OnInit {
  public Editor = ClassicEditor; //编辑器
  
  // private authorId:any;
  //编辑器的内容
  public artInfo = {
    editorData: '',
    artTitle:'',
    authorId:null,//作者id
    typeId:null//类型

  }
  //富文本编辑器配置
  public config = {
    language: 'zh-cn',
    removePlugins: [ 'Table','To-do List','Indent','Italic','Heading' ],
    height: '300px'

  };

  falg: any = null; //是发布还是修改
  title:any = ''
  nodeName = ''//备注名

  constructor(
    public routinfo: ActivatedRoute,
    public nav:NavController,
    public storage:Storage,
    public http:Http2Service,
    public noplugService:NoplugService
  ) { }

   onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    )
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      console.log(loader)
      // this.noplugService.showLoading()
      return new FileUploadAdapter(loader,this.http,this.noplugService);      
    };
   
  }

  ngOnInit() {
    this.judgeFlag();
    this. getAuthorId();
  }
  //发布按钮
  onPulish(){
    console.log(this.artInfo)
    let api = "/art/artpulish"
    this.http.post(api,this.artInfo).subscribe((res:any)=>{
      console.log(res)
      if(res.code==200){
        this.noplugService.alert("发布成功..")
        this.nav.navigateRoot(['content/',res.data.insertId])
      }
    })

  }
  //返回事件
  butBack(){

  }
  //获得当前用户id
  getAuthorId(){
    this.storage.get("userinfo").then(dat =>{
      if(dat==''||dat==null){
        this.noplugService.showToast("登录超时,请重新登录");
        this.nav.navigateRoot(['./login'])
      }else{
        this.artInfo.authorId = JSON.parse(dat)._userId
      }
      
    })
  }
  //判断是发布还是修改
  judgeFlag() {
    this.falg = this.routinfo.snapshot.params["flag"];

    if (this.falg == 'pulish') {
      //发布
      let typeid =this.routinfo.snapshot.params["id"]; 

      this.getTypeName(typeid);

      this.title='发布-';

    }
    else if (this.falg == 'edit') { 
      //修改
      this.title='修改-'

    }


  }
  //获得id对应的类别-发布
  getTypeName(typeid:any){
    this.storage.get('typeinfo').then(da=>{
      for (let index = 0; index < da.length; index++) {
        if(da[index].id == typeid){
          console.log(da[index].artname)
          this.title += da[index].artname;
          this.artInfo.typeId = da[index].id
        }
      }
    })

  }


}
