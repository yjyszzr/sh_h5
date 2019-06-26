import api from '../../../fetch/api'
import { Toast,Indicator } from 'mint-ui'
export default {
    name: 'revise',
    data () {
      return {
        passwordVal: '',
        telVal: ''
      }
    },
    created(){
      
    }, 
    methods: {
      changeNum(){
        Indicator.open()
        //验证码信息
        let data = {
          'mobile': this.phoneVal,
          'smsType': 2
        }
        this.$store.dispatch("getSmsCode",data)
        // getSmsCode(data)
      },
      findNext(){
        if(!this.phoneVal){
            Toast('请重新输入手机号')
            return
        }
        if (!this.passwordVal|| !this.telVal) {
            Toast('请填写完整')
            return
        }
        let data = {
            'mobileNumber': this.phoneVal,
            'userLoginPass': this.passwordVal,
            'smsCode': this.telVal
        }
        // console.log(JSON.parse(data))
        api.updateLoginPass(data)
        .then(res => {
            if(res.code==0) {
                this.$router.push({
                    path: '/user/pwd',
                    replace: true
                })
                Toast(res.msg)
            }

        })
      },
      handleCommentFocus1(){
        this.$refs.mima.style.color = '#505050'
      },
      handleCommentBlur1(c){
        if(c.target.value==''){
          this.$refs.mima.style.color = '#9f9f9f'
        }
      },
      handleCommentFocus2(){
        this.$refs.code.style.color = '#505050'
      },
      handleCommentBlur2(c){
        if(c.target.value==''){
          this.$refs.code.style.color = '#9f9f9f'
        }
      }
    },
    mounted(){
        this.changeNum()
    },
    computed:{
        phoneVal(){
            return this.$store.state.findphone;
        }
    },
    beforeRouteLeave (to, from, next) {
        next()
        this.$store.dispatch("reset")
    }
}