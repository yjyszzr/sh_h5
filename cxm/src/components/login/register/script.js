import api from '../../../fetch/api'
import { Toast,Indicator } from 'mint-ui'
export default {
    name: 'register',
    data () {
      return {
        phoneVal: '',
        passwordVal: '',
        telVal: '',
        eyehide: false   //控制眼睛
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
          'smsType': 1
        }
        //判断手机号是否存在，是否正确
        this.$store.dispatch("getSmsCode",data)
        // getSmsCode(data)
      },
      reg(){
        if (!this.phoneVal || !this.passwordVal|| !this.telVal) {
            Toast('请填写完整')
            return
        }else if(this.$refs.xySelected.className == 'icon-icon-29 iconfont'){
            Toast('尊敬的用户,注册需同意并接受《彩小秘注册服务协议》')
            return
        }
        let data = {
            'mobile': this.phoneVal,
            'password': this.passwordVal,
            'loginSource': '4',
            'smsCode': this.telVal
        }
        // console.log(JSON.parse(data))
        api.Register(data)
        .then(res => {
            if(res.code==0) {
                Toast('注册成功')
                localStorage.setItem('token',res.data.token)
                this.$router.push({
                    path: '/',
                    replace: false
                })
            }
        })
      },
      handleCommentFocus(){
        this.$refs.sjh.style.color = '#505050'
      },
      handleCommentBlur(c){
        if(c.target.value==''){
          this.$refs.sjh.style.color = '#9f9f9f'
        }
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
      },
      xySelectedClick(){
        if(this.$refs.xySelected.className=='icon-icon-29 iconfont xySelected'){
          this.$refs.xySelected.className = 'icon-icon-29 iconfont'
        }else{
          this.$refs.xySelected.className = 'icon-icon-29 iconfont xySelected'
        }
      }
    },
    mounted(){
        
    },
    beforeRouteLeave (to, from, next) {
        next()
        this.$store.dispatch("reset")
    }
}