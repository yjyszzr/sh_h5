import api from '../../../fetch/api'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
    name: 'setlogin',
    data () {
      return {
          setingobj:{},
          newpassval: '', //新密码
          confirmpassval:'', //确认密码
          xeyehide: false,
          qeyehide: false,
      }
    },
    created(){
      
    },
    methods:{
        setlogin(){
            if(!this.newpassval){
                Toast('请输入新密码')
                return
            }else if(!this.confirmpassval){
                Toast('请输入确认密码')
                return
            }
            if(this.newpassval != this.confirmpassval){
                Toast('两次输入密码不一致')
                return
            }

            let data = {
                "oldLoginPass": '',
                "userLoginPass" : this.newpassval,
                "type" :0
            }
            api.setinglogin(data)
                .then(res => {
                    if(res.code==0) {
                        //console.log(res)
                        this.setingobj = res.data
                            this.$router.go(-1)
                        this.$store.state.userInfo.hasPass = '1'
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