import { Injectable } from '@angular/core';
import {
  ToastController,
  LoadingController,
  AlertController
} from '@ionic/angular';
import { AlertInput, AlertButton } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class MsgLoadingService {
  private toastEle: HTMLIonToastElement;
  private loadEle: HTMLIonLoadingElement;

  private alertEle: HTMLIonAlertElement;
  private confirmEle: HTMLIonAlertElement;
  private CustomAlertEle: HTMLIonAlertElement;

  constructor(
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  
  /**
   * 消息提示：顶部 - 短
   * @param msg 消息内容
   */
  async msg(msg: string, showCloseButton: boolean = false): Promise<any> {
    // 创建
    this.toastEle = await this.toastCtrl.create({
      message: msg,
      // showCloseButton: showCloseButton,
      position: 'top',
      // closeButtonText: '关闭',
      duration: 1500,
      translucent: true,
      animated: true,
      keyboardClose: false,
      color: 'light'
    });
    // 显示
    return await this.toastEle.present();
  }
  /**
   * 关闭消息
   */
  async msgHide(): Promise<boolean> {
    if (this.toastEle) {
      return await this.toastEle.dismiss();
    }
  }

  /**
   * 显示加载中
   * @param msg 提示内容
   */
  async loading(msg: string = '正在处理'): Promise<void> {
    // 创建
    this.loadEle = await this.loadCtrl.create({
      spinner: 'crescent',
      duration: null,
      message: msg,
      animated: true,
      showBackdrop: true,
      translucent: false,
      keyboardClose: true
    });
    // 显示
    return await this.loadEle.present();
  }
  /**
   * 关闭加载中
   */
  async loadingHide(): Promise<boolean> {
    if (this.loadEle) {
      return await this.loadEle.dismiss();
    }
  }

  /**
   * alert 提示框
   * @param msg  消息
   * @param opt 参数
   */
  async alert(msg: string, opt?: AlertOpt): Promise<void> {
    this.alertEle = await this.alertCtrl.create({
      header: '提示',
      subHeader: opt && opt.subHeader,
      message: msg,
      buttons: [
        {
          text: (opt && opt.okBtnText) || '确定',
          handler: hand => {
            if (opt && opt.okCallBack) {
              return opt.okCallBack(hand);
            }
          }
        }
      ],
      animated: true,
      translucent: false,
      keyboardClose: true,
      backdropDismiss: opt.backdropDismiss
    });
    return await this.alertEle.present();
  }

  /**
   * 关闭提示框
   */
  async alertHide(): Promise<boolean> {
    if (this.alertEle) {
      return await this.alertEle.dismiss();
    }
  }

  /**
   * confirm 确认框
   * @param msg 消息
   * @param opt 参数
   */
  async confirm(msg: string, opt?: ConfirmOpt): Promise<void> {
    this.confirmEle = await this.alertCtrl.create({
      header: (opt && opt.header) || '提示',
      subHeader: opt && opt.subHeader,
      inputs: (opt && opt.inputs) || [],
      message: msg,
      buttons: [
        {
          text: (opt && opt.noBtnText) || '取消',
          role: 'cancel',
          handler: hand => {
            if (opt && opt.noCallBack) {
              return opt.noCallBack(hand);
            }
          }
        },
        {
          text: (opt && opt.okBtnText) || '确定',
          handler: hand => {
            if (opt && opt.okCallBack) {
              return opt.okCallBack(hand);
            }
          }
        }
      ],
      animated: true,
      translucent: false,
      keyboardClose: true,
      backdropDismiss: opt.backdropDismiss
    });
    return await this.confirmEle.present();
  }

  /**
   * 关闭确认框
   */
  async confirmHide(): Promise<boolean> {
    if (this.confirmEle) {
      return await this.confirmEle.dismiss();
    }
  }

  /**
   * customAlert 自定义提示框
   * @param msg 消息
   * @param opt 参数
   */
  async customAlert(msg: string, opt: CustomAlertOpt): Promise<void> {
    this.CustomAlertEle = await this.alertCtrl.create({
      header: opt.header || '提示',
      subHeader: opt.subHeader,
      inputs: opt.inputs || [],
      message: msg,
      buttons: opt.buttons,
      animated: true,
      translucent: false,
      keyboardClose: true,
      backdropDismiss: opt.backdropDismiss
    });
    return await this.CustomAlertEle.present();
  }

  /**
   * 关闭自定义框
   */
  async customAlertHide(): Promise<boolean> {
    if (this.CustomAlertEle) {
      return await this.CustomAlertEle.dismiss();
    }
  }
}


/**
 * 提示框参数
 */
export class AlertOpt {
  /**主标题 */
  header?: string;
  /**副标题 */
  subHeader?: string;
  /**确认回调 , 请使用 '=>'号，如 okCallBack: () => {} */
  okCallBack?: Function;
  /**确认按钮文本 */
  okBtnText?: string;
  /**单击背景时是否关闭 */
  backdropDismiss?: boolean;
}
/**
 * 确认框参数
 */
export class ConfirmOpt {
  /**主标题 */
  header?: string;
  /**副标题 */
  subHeader?: string;
  /**确认回调 , 请使用 '=>'号，如 okCallBack: () => {} */
  okCallBack?: Function;
  /**取消回调 , 请使用 '=>'号，如 noCallBack: () => {} */
  noCallBack?: Function;
  /**确认按钮文本 */
  okBtnText?: string;
  /**取消按钮文本 */
  noBtnText?: string;
  /**提示框中显示的输入数组 */
  inputs?: AlertInput[];
  /**单击背景时是否关闭 */
  backdropDismiss?: boolean;
}
/**
 * 自定义框参数
 */
export class CustomAlertOpt {
  /**主标题 */
  header?: string;
  /**副标题 */
  subHeader?: string;
  /**按钮数组 */
  buttons: (string | AlertButton)[];
  /**提示框中显示的输入数组 */
  inputs?: AlertInput[];
  /**单击背景时是否关闭 */
  backdropDismiss?: boolean;
}

