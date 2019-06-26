import api from '../../../fetch/api'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
    name: 'record',
    data () {
      return {
          setingobj:{},
          yeyehide: false,
          xeyehide: false,
          qeyehide: false,
          cipherpassval:'', //原密码
          newpassval:'',    //新密码
          confirmpassval:'' //确认密码
      }
    },
    created(){
      
    },
    methods:{
        setchange(){
            if (!this.cipherpassval) {
                Toast('请输入原密码')
                return
            }else if(!this.newpassval){
                Toast('请输入新密码')
                return
            }else if(!this.confirmpassval){
                Toast('请输入确认密码')
                return
            }

            // if(this.cipherpassval == this.newpassval){
            //     Toast('原密码和新密码不能相同')
            //     return
            // }else
                if(this.newpassval != this.confirmpassval){
                Toast('两次输入密码不一致')
                return
            }

            let data = {
                "oldLoginPass": this.cipherpassval,
                "userLoginPass" : this.newpassval,
                "type" :1
            }
            api.setinglogin(data)
                .then(res => {
                    if(res.code==0) {
                        console.log(res)
                        this.setingobj = res.data
                        this.$router.go(-1)


                        Toast(res.msg)
                    }
                })
        },
    },
    computed: {  

    },  
    watch: {
    },
    mounted(){
    },
}