import {APP_SERVE} from '../provider/constant'
export class FileUploadAdapter {
    

    
    public loader: any;
    public api :any;
    public http:any;
    constructor(loader:any,http:any) {
        // 初始化
        
        this.loader = loader;
        this.api = '/art/updateimg'   
        this.http =http;
      }
      upload() {
       // 上传文件

        return new Promise((resolve, reject)=>{
            const data = new FormData();

            this.loader.file.then((res) => {

                data.append('file',res);

                let da = this.http.post(this.api,data)
                da.subscribe((data:any)=>{
                    console.log(data)    
                    if (data.code==200){
                        resolve({default :APP_SERVE+ data.data.imgDir});
                    }else{
                        reject(data.msg); 
                    }
                })  
            })            
          
        })
    }                                                          
                  
  
      
    public abort() {
        // 上传失败
        console.log("失败")
    }

    }