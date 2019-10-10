import {
    nativeApp,
    getUrlStr,
    getCsUrl,
    isWebview
} from '@/util/common'
import {Indicator} from 'mint-ui'
import QRCode from 'qrcodejs2'
import {mapState} from 'vuex'
export default {
    name: 'index',
    data() {
        return {
            userid: getUrlStr('userid', location.href)
        }
    },
    beforeCreate() {
        Indicator.open()
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
                width: 100,
                height: 100, 
                text: this.shortUrl // 二维码内容 
            })
        },
        share(){
            if(isWebview()){
                nativeApp({'methodName':'goExerciseShare','title':'您收到一个红包','description':'注册领68元购彩大礼包!','url':this.shortUrl,'thumbUrl':getCsUrl()+'/static/activity/tg/img/fx.jpg'})
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
        },//生成短链
        async shortLink(){
            var longurl = getCsUrl()+'/static/activity/tg/index.html?id='+this.userid
            await this.$store.dispatch('getShortUrl',{
                link: longurl,
                userId: this.userid||''
            })
        }
    },
    computed: {
        ...mapState({
            shortUrl: state => state.shortlink
        })
    },
    mounted() {
        this.shortLink().then(()=>{
            this.qrcode()
        })
    }
}