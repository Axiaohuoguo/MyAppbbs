import { Component, OnInit, ViewChild } from '@angular/core';
import { Http2Service } from '../../services/MyHttp2.service'
import { NoplugService } from '../../provider/noplugService'
import { Storage } from '@ionic/storage'
import { QNY_SERVER } from '../../provider/constant';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})

export class EditprofilePage implements OnInit {

  public isEditPawss: boolean = false

  public userPainfo: any = {
    username: '',
    userid: -1,
    password: '',
    newpassword: '',
    renewpassword: ''
  }

  public userInfo: any = {
    id: null,
    schoolid: null,
    uid: null,
    useremail: null,
    userheadimg: null,
    username: null,
    userpassword: null,
    userphone: null,
    usersignature: null,
    usertype: null,
    usersex: -1
  }
  //候选数据解决选择框绑定数字的问题
  public opt0: number = 0
  public opt1: number = 1
  public userid: any

  constructor(
    public noplugService: NoplugService,
    public http: Http2Service,
    public storage: Storage,
    public nav: NavController,
    public imageResizer: ImageResizer
  ) {


  }

  myImageResizer(uri, folderName) {
    let options = {
      uri: uri,
      folderName: folderName,
      quality: 90,
      width: 500,
      height: 500
    } as ImageResizerOptions;

    return this.imageResizer.resize(options)

  }


  ngOnInit() {

    this.getUserInfoByUserId()

  }

  public isEmpty(val: any) {
    const reg = /^\s+|\s+$/g;
    return (val == null || typeof val === 'string' && val.replace(reg, '').length == 0)
  }
  //提交修改-资料
  onComEdit() {
    //注册事件
    let reg = /^[0-9a-zA-Z]+@(([0-9a-zA-Z]+)[.])+[a-z]{2,4}$/i;
    if (this.isEmpty(this.userInfo.username)) {
      this.noplugService.alert("提示", "用户名不能为空")
      return;
    }
    if (this.isEmpty(this.userInfo.userphone) || this.isEmpty(this.userInfo.useremail)) {
      this.noplugService.alert("提示", "手机、邮箱不能为空")
      return;
    }
    if (!reg.test(this.userInfo.useremail)) {
      this.noplugService.alert("提示", "邮箱格式不正确");
      return;
    }
    if ((this.userInfo.userphone + "").length != 11) {
      this.noplugService.alert("提示", "电话格式不正确");
      return;
    }
    if ((this.userInfo.username).length < 5) {
      this.noplugService.alert("提示", "用户名太短了...");
      return;
    }
    if ((this.userInfo.usersignature).length > 20 || (this.userInfo.usersignature).length < 2) {
      this.noplugService.alert("提示", "个性签名在2-20个字符...");
      return;
    }

    let api = "/user/updateuserinfo"
    this.http.post(api, this.userInfo).subscribe((res: any) => {
      if (res.code == 200) {
        this.noplugService.alert("修改成功..清重新登录")
        setTimeout(() => {
          this.nav.navigateRoot(['./login'])
        }, 1000);
      }
      else {
        this.noplugService.alert(res.msg)
      }
    })

  }
  //提交修改-密码
  onComEditPaw() {
    if (this.isEmpty(this.userPainfo.password)
      || this.isEmpty(this.userPainfo.newpassword)
      || this.isEmpty(this.userPainfo.renewpassword)) {
      this.noplugService.alert("提示", "参数为空！！！")
      return;
    }
    if (this.userPainfo.newpassword != this.userPainfo.renewpassword) {
      this.noplugService.alert("提示", "两次新密码不一致！！！")
      return
    }
    if ((this.userPainfo.newpassword).length < 6) {
      this.noplugService.alert("提示", "密码至少6位！")
      return
    }
    this.getUser().subscribe(us => {
      if (us != null) {
        console.log(us)
        this.userPainfo.userid = us._userId
        this.userPainfo.username = us._username
      }
    })
    console.log(this.userPainfo)
    let api = "/user/updateuserpasw"
    this.http.post(api, this.userPainfo).subscribe((res: any) => {
      console.log(res)
      if (res.code == 200) {
        this.noplugService.alert("修改成功..清重新登录")
        setTimeout(() => {
          this.nav.navigateRoot(['./login'])
        }, 1000);
      }
      else {
        this.noplugService.alert(res.msg)
      }
    })

  }

  onchangeIng(e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      // e.target.result 是图片的 base64 流数据
      console.log(e.target.result)
      this.noplugService.compressImage(e.target.result).then(compressImg => {
        const compressFile = this.noplugService.base4ToFile(compressImg, file.name)
        // 此处进行上传功能的书写
        this.uplodeimg(compressFile).then(a => {
          console.log(a.default);
          if (a != null) {
            this.userInfo.userheadimg = a.default
          }
        })
        console.log(compressFile)
      })

    }


  }
  getUserInfoByUserId() {

    this.getUser().subscribe(us => {
      if (us != null) {
        this.userid = us._userId
        let api = "/user/getuserinfobyuserid"
        let par = { "userid": this.userid }
        this.http.get(api, par).subscribe((res: any) => {
          console.log(res)
          if (res.code == 200) {
            this.userInfo = res.data;
          }
        })
      }

    })


  }
  // 获得当前用户id
  getUser(): Observable<any> {
    return new Observable(obser => {
      this.storage.get("userinfo").then((user: any) => {
        if (user == null) {
          this.noplugService.alert("身份验证失败...")
          this.nav.navigateRoot(['./login'])
          obser.error("erro")
        }
        obser.next(JSON.parse(user))

      })

    })
  }

  /**
   * 头像上传
   * @param img 
   */
  uplodeimg(img): Promise<any> {

    console.log("==========================")
    console.log("type", typeof (img))

    const data = new FormData();
    let api = '/upload/uploadimg'

    return new Promise((resolve, reject) => {
      console.log("res", img)
      data.append('file', img);
      console.log("data", typeof (data))

      let da = this.http.post(api, data)
      da.subscribe((data: any) => {
        console.log(data)

        if (data.code == 200) {
          resolve({ default: QNY_SERVER + data.data.imgDir });
        } else {
          reject(data.msg);
        }
      })

    })

  }

  // 是否放修改密码
  isEditP() {
    this.isEditPawss = !this.isEditPawss
  }


  //  1、M转F

  // File file = new File(path); 

  // FileUtils.copyInputStreamToFile(multipartFile.getInputStream(), file);  

  // 2、F转M

  // File file = new File("src/test/resources/input.txt");

  // FileInputStream input = new FileInputStream(file);

  // MultipartFile multipartFile =new MockMultipartFile("file", file.getName(), "text/plain", IOUtils.toByteArray(input));
  onSheet() {

    this.noplugService.presentActionSheet(call => {

      if (call == 'test') {
        console.log("ttttt")
        // return document.getElementById('inputfile').click()
        return document.getElementById('inputfile').click()
      }
      if (call == 'images') {
        console.log(2)
        this.noplugService.getPictureByPhotoLibrary().subscribe(a => {
          console.log('img', a)
          console.log(typeof (a))

          this.myImageResizer(a, "img").then((filePath: string) => console.log('FilePath', filePath))
            .catch(e => console.log(e));

        })
        return
      }
      if (call == 'camera') {
        this.noplugService.getPictureByCamera().subscribe(ca => {
          console.log('ca', ca)
          console.log(typeof (ca))
          this.myImageResizer(ca, "ca").then((filePath: string) => console.log('FilePath', filePath))
            .catch(e => console.log(e));

        })
        console.log(3)
        return
      }
      if (call == false) {
        console.log(4)
        return
      }

    })
  }
}
