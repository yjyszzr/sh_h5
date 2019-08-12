import {
    nativeApp,
    getUrlStr,
    getCsUrl,
    isWebview
} from '@/util/common'
import QRCode from 'qrcodejs2'
export default {
    name: 'index',
    data() {
        return {
            userid: getUrlStr('userid', location.href)
        }
    },
    created() {
        nativeApp({
            'methodName': 'showTitle',
            'title': '我的二维码'
        })
    },
    methods: {
        qrcode() {
            let qrcode = new QRCode('qrcode', {
                text: getCsUrl()+'/static/activity/tg/index.html?id='+this.userid // 二维码内容 
            })
        },
        share(){
            if(isWebview()){
                nativeApp({'methodName':'goShare','title':'您收到一个红包','description':'注册送68元彩金首单免费!','url':getCsUrl()+'/static/activity/tg/index.html?id='+this.user_id,'thumbUrl':''})
            }
        },
        //截屏
        screenShot(){
            if(isWebview()){
                nativeApp({
                    'methodName': 'screenShot'
                })
                //alert('截屏成功');
            }
        },
        //复制
        copy(){
            if(isWebview()){
                nativeApp({
                    'methodName': 'copyText',
                    'text': this.userid
                })
            }
        }
    },
    mounted() {
        this.qrcode()
    }
}