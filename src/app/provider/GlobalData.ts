import { Injectable } from '@angular/core';
@Injectable()
export class GlobalData {

    // private _staffName: string;//姓名
    // private _refreshToken: string;//refreshToken
    // private _authTime: number;//token认证时间
    //app更新进度.默认为0,在app升级过程中会改变
    // private _updateProgress: number = -1;    

    private _artnum: any;//文章数量


    private _userId: string;//用户id
    private _username: string;//用户名
    private _schoolid: string; //学校id
    private _shoolname: string; //学校名称
    private _useremail: string;//邮箱
    private _uid: string; //uid
    private _userPassWord: string;//密码    
    private _loginErr: any = 0;//解决重复跳转登录的问题
    private _cookie: any;
    private _userheadimg: any;
    private _usertype: any;
    private _userphone: any;
    private _usersignature: any;

    public get artnum(): any {
        return this._artnum;
    }
    public set artnum(value: any) {
        this._artnum = value;
    }
    
    public get userphone(): any {
        return this._userphone;
    }
    public set userphone(value: any) {
        this._userphone = value;
    }

    public get usersignature(): any {
        return this._usersignature;
    }
    public set usersignature(value: any) {
        this._usersignature = value;
    }

    public get usertype(): any {
        return this._usertype;
    }
    public set usertype(value: any) {
        this._usertype = value;
    }



    public get userheadimg(): any {
        return this._userheadimg;
    }
    public set userheadimg(value: any) {
        this._userheadimg = value;
    }


    public get useremail(): string {
        return this._useremail;
    }
    public set useremail(value: string) {
        this._useremail = value;
    }

    public get schoolid(): string {
        return this._schoolid;
    }
    public set schoolid(value: string) {
        this._schoolid = value;
    }
    public get shoolname(): string {
        return this._shoolname;
    }
    public set shoolname(value: string) {
        this._shoolname = value;
    }

    public get uid(): string {
        return this._uid;
    }
    public set uid(value: string) {
        this._uid = value;
    }


    public get cookie(): any {
        return this._cookie;
    }
    public set cookie(value: any) {
        this._cookie = value;
    }

    //设置http请求是否显示loading,注意:设置为true,接下来的请求会不显示loading,请求执行完成会自动设置为false
    private _showLoading: boolean = true;

    //是否有网
    private _isNetwork: boolean = true;

    private _slideImgSrcList: any = [];
    public get slideImgSrcList(): any {
        return this._slideImgSrcList;
    }
    public set slideImgSrcList(value: any) {
        this._slideImgSrcList = value;
    }

    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }


    public get userPassWord(): string {
        return this._userPassWord;
    }
    public set userPassWord(value: string) {
        this._userPassWord = value;
    }


    public get loginErr(): any {
        return this._loginErr;
    }
    public set loginErr(value: any) {
        this._loginErr = value;
    }

    public get showLoading(): boolean {
        return this._showLoading;
    }
    public set showLoading(value: boolean) {
        this._showLoading = value;
    }


    public get isNetwork(): boolean {
        return this._isNetwork;
    }
    public set isNetwork(value: boolean) {
        this._isNetwork = value;
    }


    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }

}