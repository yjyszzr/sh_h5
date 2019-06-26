import {MessageBox,Toast,Indicator} from 'mint-ui';
import quickSms from '../quickSms/index.vue'
import api from '../../../../fetch/api'
export default {
    name: 'quickInfo',
    data(){
        return {
            blankNum: '',
            xyInputFlag: false,
            bankType: '',
            bankName: '',
            name: '',
            sfz: '',
            yxq: '',
            ccvv: '',
            telval: '',
            codeval: '',
            //验证码初始化
            smsCode: {
                changeNumber: 60,
                changeText: '获取短信验证码',
                disabled: false,
                timer: ''
            },
            token: '',
            amt: ''
        }
    },
    created(){
        let data = {
            'emptyStr': '',
            'PayLogId': this.$route.query.id
        }
        api.appCfg(data)
            .then(res => {
                if(res.code==0) {
                    this.amt = res.data.amt
                    this.$store.commit('XFBANKLIST',res.data.bankList)
                    this.$store.commit('XFBANKSELCTED',res.data.bankList[0])
                }
            })
    },
    components: {
        "v-quicksms": quickSms
    },
    methods:{
        bankCard(){
            this .blankNum = this.blankNum.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
        },
        khxq(){
            MessageBox.alert('', {
                message: '为了您的账户资金安全,只能绑定持卡人本人的银行卡。',
                title: '持卡人说明',
                confirmButtonText: '知道了',
                closeOnClickModal: false
            }).then(action => {
                
            });
        },
        ccv(){
            MessageBox.alert('', {
                message: 'CVV是打印在信用卡背面的末尾三位独立展示的数字。',
                title: 'CVV说明',
                confirmButtonText: '知道了',
                closeOnClickModal: false
            }).then(action => {
                
            });
        },
        yxqxq(){
            MessageBox.alert('', {
                message: '有效期是打印在信用卡正面卡号上方,标注格式为月份在前,年份在后的四位数。',
                title: '有效期说明',
                confirmButtonText: '知道了',
                closeOnClickModal: false
            }).then(action => {
                
            });
        },
        telxq(){
            MessageBox.alert('', {
                message: '银行预留手机号是办理该银行卡时所填写的手机号码。没有预留,手机号忘记或者 已停用请联系银行客服处理 。',
                title: '手机号说明',
                confirmButtonText: '知道了',
                closeOnClickModal: false
            }).then(action => {
                
            });
        },
        nocodeClick(){
            MessageBox.alert('', {
                message: '1、请确认当前手机是否为银行预留手机号码 。2、请检查短信是否被手机安全软件拦截。3、请确认当前手机号是否存在欠费停机、关机或无法接通的情况。4、获取更多帮助，请联系我们在线客服。',
                title: '提示 ',
                confirmButtonText: '知道了',
                closeOnClickModal: false
            }).then(action => {
                
            });
        },
        backType(){
            if(this.blankNum!==''){
                let data = {
                    'bankCardNo':this.blankNum.replace(/\s/g,'')
                  }
                  api.getBankType(data)
                  .then(res => {
                      if(res.code==0) {
                        this.bankType = res.data.bankType
                        this.bankName = res.data.bankName
                      }else{
                        this.bankType = ''
                        this.bankName = ''
                      }
                  })
            }else{
                this.bankType = ''
            }
        },
        changeNum(){
            Indicator.open()
            //验证码信息
            let data = {
                'accNo': this.blankNum.replace(/\s/g,''),
                'certNo': this.sfz,
                'code':this.codeval,
                'name': this.name,
                'phone': this.telval,
                'payLogId': this.$route.query.id,
                'token': this.token,
                'cvn2': this.ccvv,
                'validDate': this.yxq
            }
            api.xfapp(data)
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
                                this.smsCode.changeText = '<b style="color: #ea5504;font-weight:400;">'+this.smsCode.changeNumber + 's</b>后重新获取'
                            }
                        }, 1000)
                        Toast(res.msg)
                    }
                })
        },
        cfmBtn(){
            if(this.bankName===''||this.name===''||this.sfz===''||this.telval===''||this.codeval===''){
                Toast('请填写完整')
                return false
            }
            Indicator.open()
            //验证码信息
            let data = {
                'code': this.codeval,
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
    },
    computed: {
        xfbklist() {
          return this.$store.state.xfbanklist;
        }
    },
    beforeRouteLeave (to, from, next) {
        clearInterval(this.smsCode.timer)
        this.$store.dispatch("getMarkplay",'')
        this.$store.commit('XFBANKLIST','')
        this.$store.dispatch("getMarkplayBox",false)
        next()
    }
}