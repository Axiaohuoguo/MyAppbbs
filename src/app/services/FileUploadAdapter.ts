import { APP_SERVE, QNY_IMG_API } from '../provider/constant'
import { QNY_SERVER } from '../provider/constant'



export class FileUploadAdapter {
    public loader: any;
    public api: any;
    public http: any;
    public noplugService: any
    constructor(
        loader: any,
        http: any,
        noplugService: any
    ) {

        // 初始化
        this.loader = loader;
        this.api = '/upload/uploadimg'
        // this.api = '/art/updateimg'   
        this.http = http;
        this.noplugService = noplugService
    }
    upload() {
        // 上传文件   

        return new Promise((resolve, reject) => {
            const data = new FormData();


            this.loader.file.then((res) => {
                const reader = new FileReader()
                reader.readAsDataURL(res)
                reader.onload = (e) => {
                    // e.target.result 是图片的 base64 流数据
                    console.log(e.target.result)
                    this.noplugService.compressImage(e.target.result).then(compressImg => {
                        const compressFile = this.noplugService.base4ToFile(compressImg, res.name)
                        // 此处进行上传功能的书写

                        console.log("res", res)
                        console.log("res", compressFile)
                        data.append('file', compressFile);
                        console.log("data", data)
                        let da = this.http.post(this.api, data)
                        da.subscribe((data: any) => {
                            console.log(data)

                            if (data.code == 200) {
                                if ((data.data.imgDir).search(".gif")) {
                                    resolve({ default: QNY_SERVER + data.data.imgDir });
                                }
                                resolve({ default: QNY_SERVER + data.data.imgDir + QNY_IMG_API });
                            } else {
                                reject(data.msg);
                            }
                        })

                    })

                }

            })

        })
    }



    public abort() {
        // 上传失败
        console.log("失败")
    }

}