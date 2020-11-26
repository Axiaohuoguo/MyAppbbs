import { NavController } from '@ionic/angular';
import { GlobalData } from "../provider/GlobalData";
import { NoplugService } from "../provider/noplugService";
import { Observable, TimeoutError, pipe } from "rxjs";
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { APP_SERVE_URL } from '../provider/constant'
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';


@Injectable()
export class Http2Service {
  constructor(
    public cookieService: CookieService,
    public http: HttpClient,
    public storage: Storage,
    private globalData: GlobalData,
    public nav: NavController,
    private noplugService: NoplugService
  ) {

  }

  public myRequest(method: string, api: string, options): Observable<Response> {



    let url: string = APP_SERVE_URL + api;

    return new Observable(observer => {

      this.http.request(method, url, options).subscribe((response: any) => {

        this.noplugService.hideLoading();


        if (response.code == 401) {
          this.nav.navigateRoot(['./login']);
        }
        observer.next(response)


      }, (err) => {

        console.log("错误信息")
        console.log(err)
        this.requestFailed(err);//处理失败请求

        observer.error(err);
      }
      )

    })
  }
  // options: {
  //   body?: any;
  //   headers?: HttpHeaders | {
  //       [header: string]: string | string[];
  //   };
  //   observe?: 'body';
  //   params?: HttpParams | {
  //       [param: string]: string | string[];
  //   };

  /**
   * 普通get请求/带请求头的get
   * @param api 
   * @param paramMap 
   */
  public get(api: string, paramMap: any = null, header: any = null): Observable<Response> {
    
    let option = {

      params: paramMap,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials:true,
      // observe: 'events',
      responseType:'json',
    }
    return this.myRequest('get', api, option);
  }


  public post(api: string, paramMap: any = null, header: any = null): Observable<Response> {

    let option = {

      body: paramMap,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials:true,
      // observe: 'events',
      responseType:'json',
    }
    return this.myRequest('post', api, option);
  }

  /**
   * 处理请求失败事件
   * @param url 
   * @param options 
   * @param err 
   */
  private requestFailed(err: any): void {
    this.noplugService.hideLoading();
    if (err instanceof TimeoutError) {
      this.noplugService.alert('请求超时,请稍后再试!');
      return;
    }
    //err数据类型不确定,判断消息体是否有message字段,如果有说明是后台返回的json数据
    // let index = JSON.stringify(err['_body']).indexOf('message');
    // if (index != -1) {
    //   this.nativeService.alert(err.json().message || '请求发生异常');
    //   return;
    // }
    let status = err.status;
    let msg = '请求发生异常';
    if (status === 0) {
      msg = '请求失败，请求响应出错';
    }
    else if (status === 400) {
      msg = '错误的操作';
    }
    else if (status === 404) {
      msg = '请求失败，未找到请求地址';
    }
    else if (status === 500) {
      msg = '请求失败，服务器出错，请稍后再试';
    }
    else if (status === 405) {
      msg = '不支持这样的请求';
    }
    else if (status === 401) {
      this.nav.navigateRoot(['./login'])
      return;
    }
    this.noplugService.alert(msg);
  }
}