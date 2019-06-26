import api from '../../../../fetch/api'
import {Indicator,Toast} from 'mint-ui'

export default {
    name: 'mycode',
    data() {
        return {
            token: '',
            mobileVal: '',
            passwordVal: '',
            telVal: '',
            eyehide:false ,
            stop:false,
            changeText:'获取验证码',
            remainTime: 60,
            Interval:null,
            address:this.$store.state.pop.name?this.$store.state.pop.name:'请选择您所在的店铺（必选）'
        }
    },
    mounted() {
        
    },
    methods: {
        changeNum() {
            if(this.$store.state.pop===''){
                Toast('请先选择店铺')
                return false;
            }
            //验证码信息
            let data = {
                'mobile': this.mobileVal,
                'smsType': 1
            }

            api.registSms(data)
                .then(res => {
                   // console.log(res)
                    if (res.code == 0) {
                        //发短信成功了，再调下面这两句
                        this.stop = true;
                        this.Interval = setInterval(this.update, 1000)
                    }
                })
        },
        update()
            {
                if (this.remainTime <= 1) {
                    // 重置计数
                    this.remainTime = 60
                    // 清除计时器
                    clearInterval(this.Interval)
                    this.changeText = '重新获取'
                    this.stop = false
                } else {
                    // 倒计时
                    this.remainTime--;
                }
        },
        reg_btn(){
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
            if(!reg.test(this.passwordVal)){
                Toast('请输入正确密码格式')
                return false;
            }else  if(this.$store.state.pop===''){
                Toast('请先选择店铺')
                return false;
            }
            Indicator.open()
            let data = {
                channelId :this.$store.state.pop.id,  //渠道Id
                mobile :this.mobileVal,
                password :this.passwordVal,
                smsCode : this.telVal ,  //短信验证码
                smsType :1, //短信类型:0-短信登录验证码 1-注册验证码 2-忘记密码验证码
            }
            api.registration(data)
                .then(res => {
                    if (res.code == 0) {
                        this.$router.push({
                            path: '/activity/tuiguang/success'
                        })
                    }
                })
        }
    }
    ,
    activated(){
        this.address = this.$store.state.pop.name?this.$store.state.pop.name:'请选择您所在的店铺（必选）'
        this.changeText = '获取验证码'
        this.remainTime =  60
        this.stop = false
    },
    beforeRouteLeave(from,to,next){
        clearInterval(this.Interval)
        next()
    },
}
