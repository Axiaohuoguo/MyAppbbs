import {APP_SERVE} from '../provider/constant'
import {QNY_SERVER} from '../provider/constant'
export class FileUploadAdapter {
    

    
    public loader: any;
    public api :any;
    public http:any;
    public noplugService:any
    constructor(loader:any,http:any,noplugService) {
        // 初始化
        
        this.loader = loader;
        this.api = '/upload/uploadimg'   
        // this.api = '/art/updateimg'   
        this.http =http;
        this.noplugService = noplugService
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
                        resolve({default :QNY_SERVER+ data.data.imgDir});
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