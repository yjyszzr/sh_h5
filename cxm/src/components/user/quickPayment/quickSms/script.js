import api from '../../../../fetch/api'
import {Toast,Indicator} from 'mint-ui';
export default {
    name: 'quickSms',
    data(){
        return {
            numbers: '',
            token: '',
            //验证码初始化
            smsCode: {
                changeNumber: 60,
                changeText: '获取短信验证码',
                disabled: false,
                timer: ''
            },
        }
    },
    props:[
        'amt'
    ],
    methods:{
        reset(){
            this.numbers = ''
        },
        bankClick(){
            this.$store.dispatch("getMarkplay",'banklist')
            this.$store.dispatch("getMarkplayBox",true)
        },
        changeNum(){
            Indicator.open()
            //验证码信息
            let data = {
                'recordId': this.xfSelected.recordId,
                'payLogId': this.$route.query.id,
                'token': this.token,
            }
            api.appBankListPay(data)
                .then(res => {
                    if(res.code==0) {
                        this.smsCode.disabled = true
                        this.token = res.data.token
                        this.smsCode.timer = setInterval(() => {
                            this.smsCode.changeNumber--;
                            if (this.smsCode.changeNumber <= 0) {
                                this.smsCode.changeText = '重新获取验证码'
                                clearInterval(this.smsCode.timer)
                                this.smsCode.changeNumber = 60
                                this.smsCode.disabled = false
                            } else {
                                this.smsCode.changeText = '<b style="color: #fff;font-weight:400;">'+this.smsCode.changeNumber + 's</b>后重新获取'
                            }
                        }, 1000)
                        Toast(res.msg)
                    }
                })
        }
    },
    computed: {
        xfSelected(){
          return this.$store.state.xfbankSelected;
        }
    },
    watch:{
        numbers(a,b){
            if(a.split('').length>=6){
                Indicator.open()
                //验证码信息
                let data = {
                    'code': this.numbers,
                    'payLogId': this.$route.query.id,
                    'token': this.token
                }
                api.xfappConfirm(data)
                    .then(res => {
                        if(res.code==0) {
                            Toast(res.msg)
                            if(this.$route.query.from=='h5'){
                                this.$router.replace({
                                    path: '/'
                                })
                            }else{
                                location.href = 'caixm://caixiaomi.net'
                            }
                        }
                    })
            }
        }
    }
}
