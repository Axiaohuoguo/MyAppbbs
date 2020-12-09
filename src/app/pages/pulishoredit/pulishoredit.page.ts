import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage'
import { Http2Service } from '../../services/MyHttp2.service'

import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { FileUploadAdapter } from '../../services/FileUploadAdapter'
import { NoplugService } from '../../provider/noplugService'
import { GlobalData } from '../../provider/GlobalData';
import { title } from 'process';

@Component({
  selector: 'app-pulishoredit',
  templateUrl: './pulishoredit.page.html',
  styleUrls: ['./pulishoredit.page.scss'],
})
export class PulishoreditPage implements OnInit {
  public Editor = ClassicEditor; //编辑器

  private pageType:any 
  // private authorId:any;
  //编辑器的内容
  public typeList:any = []

  public artInfo = {
    editorData:'',
    artTitle: '',
    authorId: null,//作者id
    typeId: null,//类型
    id :null       
  }
  //富文本编辑器配置
  public config = {
    language: 'zh-cn',
    removePlugins: ['Table', 'To-do List', 'Indent', 'Italic', 'Heading'],
    height: '300px'

  };

  falg: any = null; //是发布还是修改
  title: any = ''
  nodeName = ''//备注名

  constructor(
    public routinfo: ActivatedRoute,
    public nav: NavController,
    public storage: Storage,
    public http: Http2Service,
    public noplugService: NoplugService,
    public globalData: GlobalData,
    public loading: LoadingController
  ) { }

  onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    )
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      console.log(loader)

      this.noplugService.showLoading("图片处理ing")

      let date = new FileUploadAdapter(loader, this.http)

      date.upload().then((dat: any) => {
        if (dat.default != null) {
          this.loading.dismiss()
        }
      })
      return date;

    };

  }

  ngOnInit() {
    this.judgeFlag();
    this.getAuthorId();
  }

  //去除html标签
  atchReg(str) {
    let reg = /<\/?.+?\/?>/g;
    return str.replace(reg, '')
  }
  //发布按钮
  onPulish() {
    if (this.artInfo.artTitle.length < 5) {
      this.noplugService.alert("标题不能少于五个字...")
      return;
    }
    if (this.atchReg(this.artInfo.editorData).length < 15) {
      this.noplugService.alert("文章内容不能少于15个字...")
      return;
    }

    
    console.log(this.artInfo)
    let api = "/art/artpulish"
    this.noplugService.showLoading("发布中...")
    this.http.post(api, this.artInfo).subscribe((res: any) => {
      console.log(res)
      if (res.code == 200) {
        this.loading.dismiss()
        this.noplugService.alert("发布成功..")        
        this.nav.navigateRoot(['content/', res.data.insertId])
      }
      else{
        this.loading.dismiss()
        this.noplugService.alert(res.msg)
      }
    })

  }
  //返回事件
  butBack() {

  }

  //获得当前用户id
  getAuthorId() {
    this.storage.get("userinfo").then(dat => {
      if (dat == '' || dat == null) {
        this.noplugService.showToast("登录超时,请重新登录",1000,'top','warning');
        this.nav.navigateRoot(['./login'])
      } else {
        this.artInfo.authorId = JSON.parse(dat)._userId
      }

    })
  }
  // 过得类型
  getTypeList(){
    this.storage.get("typeinfo").then((res:any)=>{
      console.log(res)
      this.typeList = res
    })
  }
  //判断是发布还是修改
  judgeFlag() {
    this.falg = this.routinfo.snapshot.params["flag"];
    let id = this.routinfo.snapshot.params["id"];
    if (this.falg == 'pulish') {
      //发布
      this.getTypeName(id);
      this.title = '发布-';
      this.pageType = true;
      console.log("发布")

    }
    else if (this.falg == 'edit') {
      //修改
      this.title = '修改-'
      this.pageType = false;
      this.artInfo.id = id
      console.log("修改")
      this. getTypeList();
      this.getArtInfoByid(id)      

    }


  }
  //通过文章id获得文章信息
  getArtInfoByid(id){
    let api  = "/art/getartinfobyid"
    let par = {"id":id}
    this.http.get(api,par).subscribe((res:any)=>{
      console.log(res);
      this.artInfo.artTitle = res.data.arttitle
      this.artInfo.typeId = res.data.typeid
      this.artInfo.editorData = res.data.artcontent
    })
  }
  //获得id对应的类别-发布
  getTypeName(typeid: any) {
    this.storage.get('typeinfo').then(da => {
      for (let index = 0; index < da.length; index++) {
        if (da[index].id == typeid) {
          console.log(da[index].artname)
          this.title += da[index].artname;
          this.artInfo.typeId = da[index].id
        }
      }
    })

  }
  //修改按钮
  onEdit(){
    if (this.artInfo.artTitle.length < 5) {
      this.noplugService.alert("标题不能少于五个字...")
      return;
    }
    if (this.atchReg(this.artInfo.editorData).length < 15) {
      this.noplugService.alert("文章内容不能少于15个字...")
      return;
    }

    console.log(this.artInfo)
    let api = "/art/updateart"
    this.noplugService.showLoading()
    this.http.post(api, this.artInfo).subscribe((res: any) => {      
      console.log(res)
      if (res.code == 200) {
        this.loading.dismiss()
        this.nav.navigateRoot(['content/', res.data.artid])

      }
      else{
        this.loading.dismiss()
        this.noplugService.alert(res.msg)
      }
    })

  }



}
