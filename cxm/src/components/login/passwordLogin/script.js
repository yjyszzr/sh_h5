import api from '../../../fetch/api'
import { Toast } from 'mint-ui'
export default {
    name: 'password',
    data () {
      return {
        phoneVal: '',
        passwordVal: '',
        eyehide: false,   //控制眼睛
        returnGo: this.$route.query.returnGo
      }
    },
    created(){
      
    },
    methods:{
      _login(){
        if (!this.phoneVal) {
            Toast('请输入正确的手机号')
            return
        }else if(!this.passwordVal){
          Toast('请输入6-20位的密码')
          return
        }
        let data = {
            'mobile': this.phoneVal,
            'password': this.passwordVal,
            'loginSource': '4'
        }
        // console.log(JSON.parse(data))
        api.LoginByPass(data)
        .then(res => {
            if(res.code==0) {
                localStorage.setItem('token',res.data.token)
                if(this.returnGo){
                  this.$router.go(-2)
                }else{
                  this.$router.push({
                    path: '/',
                    replace: true
                  })
                }
                //this.$router.go(-1);
                Toast(res.msg)
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
    },
    mounted(){
    },
    beforeRouteLeave(to, from, next) {
      next()
      if(to.path=='/user'){
        this.$router.push({
            path: '/',
            replace: true
        })
      }
    }
}