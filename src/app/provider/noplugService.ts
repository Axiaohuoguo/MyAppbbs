import { ToastController, LoadingController, Platform, AlertController } from "@ionic/angular";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import {
  IMAGE_SIZE,
  QUALITY_SIZE,
  REQUEST_TIMEOUT,
} from "../provider/constant";

import { GlobalData } from "./GlobalData";
import { Observable } from "rxjs";
import { Utils } from "./Untils";


import { Injectable } from '@angular/core';
@Injectable()
export class NoplugService {
  private loading: LoadingController;
  private loadingIsOpen: boolean = false;

  constructor(
    private platform: Platform,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private toast: ToastController,
    private loadingCtrl: LoadingController,
    private globalData: GlobalData,
    private camera: Camera,
    public actionSheetController: ActionSheetController
  ) {
  }




  async alert(title: string, subTitle: string = "") {
    const alert = await this.alertCtrl.create({
      header: title,
      // subHeader: subTitle,
      message: subTitle,
      buttons: [{ text: '确定' }]
    });
    await alert.present();
  }

  /***
   * 是否继续
   */
  async alertIscontinue(title: string, message: string = "提示", ca) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: title,
      message: message,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('取消');

            ca(false)
          }
        }, {
          text: '确定',
          handler: () => {
            // console.log('Okay');
            ca(true)

          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * 
   * @param message 消息
   * @param duration 时间
   * @param position 位置
   * @param color 颜色
   * @param translucent 半透明？
   */
  // "primary", "secondary", "tertiary", 
  // "success", "warning", "danger",
  //  "light", "medium", and "dark"
  async showToast(
    message: string = '操作完成',
    duration: number = 2000,
    position: any = 'bottom',
    color: string = 'success',
    translucent: boolean = false
  ) {
    const toast = await this.toast.create({
      message: message,
      duration: duration,
      position: position,
      color: color,
      translucent: translucent
    });
    toast.present();
  }

  /**
   * 统一调用此方法显示loading
   * @param content 显示的内容
   */
  async showLoading(content: string = '', duration: number = 10000) {
    const loading = await this.loadingCtrl.create({
      spinner: "crescent",
      duration: duration,
      message: content,
      translucent: false,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
  /**
   * http请求默认转圈圈，请求前调用此方法禁用转圈圈
   */
  setLoadingTrue() {
    this.globalData.showLoading = false;
  }
  /**
   * 关闭loading
   */
  hideLoading(): void {
    if (!this.globalData.showLoading) {
      this.globalData.showLoading = true;
    }
    this.loadingIsOpen && this.loading.dismiss();
    this.loadingIsOpen = false;
  }


  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });

    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!', role, data);
  }




  /**
* 通过拍照获取照片
* @param options
*/
  getPictureByCamera(options: CameraOptions = {}): Observable<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
    }, options);
    return this.getPicture(ops);
  };

  /**
   * 通过图库获取照片
   * @param options
   */
  getPictureByPhotoLibrary(options: CameraOptions = {}): Observable<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
    }, options);
    return this.getPicture(ops);
  };

  /**
* 使用cordova-plugin-camera获取照片
* @param options
*/
  getPicture(options: CameraOptions = {}): Observable<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
      destinationType: this.camera.DestinationType.DATA_URL,//默认返回base64字符串,DATA_URL:base64   FILE_URI:图片路径
      quality: QUALITY_SIZE,//图像质量，范围为0 - 100
      //allowEdit: true,//选择图片前是否允许编辑
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: IMAGE_SIZE,//缩放图像的宽度（像素）
      targetHeight: IMAGE_SIZE,//缩放图像的高度（像素）
      saveToPhotoAlbum: false,//是否保存到相册
      correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
    }, options);
    return Observable.create(observer => {
      this.camera.getPicture(ops).then((imgData: string) => {
        if (ops.destinationType === this.camera.DestinationType.DATA_URL) {
          observer.next('data:image/jpg;base64,' + imgData);
        } else {
          observer.next(imgData);
        }
      }).catch(err => {
        if (err == 20) {
          this.alert('没有权限,请在设置中开启权限');
          return;
        }
        if (String(err).indexOf('cancel') != -1) {
          return;
        }
        // this.logger.log(err, '使用cordova-plugin-camera获取照片失败');
        this.alert('获取照片失败');
      });
    });
  };


  /**
   * 按钮列表
   */
  async presentActionSheet(call: any) {

    const actionSheet = await this.actionSheetController.create({
      header: '选择操作',
      cssClass: 'my-custom-class',
      buttons: [{
        text: '测试模式',
        role: 'destructive',
        icon: 'analytics',
        handler: () => {

          call('test')
          console.log('浏览器测试');
        }
      }, {
        text: '从相册选择',
        icon: 'images',
        handler: () => {
          call('images')
          console.log('重相册选择');
        }
      }, {
        text: '拍照',
        icon: 'camera',
        handler: () => {
          call('camera')
          console.log('拍照');
        }
      }, {
        text: '取消',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          call(false)
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


// 获得base64流数据
  getImgBas64(file) {
    
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      // e.target.result 是图片的 base64 流数据
      console.log(e.target.result)
    }
  }
  //压缩图片
  compressImage(base64Img){
    const image = new Image()
    image.src = base64Img
    return new Promise(resolve => {
      image.onload = () => {
        let { width, height } :any = image
        if (width > 1024) {
          width = 1024
          height = Math.ceil(1024 * image.height / image.width)
        }
        let canvas:any = document.getElementById("compressCanvas")
        if(!canvas){
          const body = document.body
          canvas = document.createElement('canvas') // 创建canvas标签
          canvas.id = 'compressCanvas' // 给外层容器添加一个id
          canvas.style.position = 'fixed'
          canvas.style.zIndex = '-1'
          canvas.style.opacity = '0'
          canvas.style.top = '-100%'
          canvas.style.left = '-100%'
          body.append(canvas)
        }
        const context = canvas.getContext("2d")
        canvas.height = height
        canvas.width = width
        context.drawImage(image, 0, 0, width, height)
        const compressBase64 = canvas.toDataURL('image/jpeg', '0.7')
        resolve(compressBase64)
      }
    })
  }
//base4ToFile
base4ToFile (base64Image, fileName) {
  const arr = base64Image.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  fileName = fileName || ('pj' + Date.now() + '.jpg')
  var file = new File([u8arr], fileName, { type: mime })
  return file
}

}