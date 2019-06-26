import api from '../../../fetch/api'
import { Toast } from 'mint-ui'
import {Indicator} from 'mint-ui'
export default {
    name: 'certification',
    data () {
      return {
        userName: '',
        userToken: ''
      }
    },
    created(){
      
    },
    methods: {
        rzBtn(){
            Indicator.open()
            let data = {
                'idcode': this.userToken,
                'realName': this.userName
            }
            api.realNameAuth(data)
            .then(res => {
                if(res.code==0) {
                    this.$router.push({
                        path: '/user',
                        replace: true
                    })
                    Toast(res.msg)
                }

            })
        },
        handleCommentFocus(){
            this.$refs.name.style.color = '#505050'
        },
        handleCommentBlur(c){
            if(c.target.value==''){
                this.$refs.name.style.color = '#9f9f9f'
            }
        },
        handleCommentFocus1(){
            this.$refs.card.style.color = '#505050'
        },
        handleCommentBlur1(c){
            if(c.target.value==''){
                this.$refs.card.style.color = '#9f9f9f'
            }
        },
    },
    mounted(){
        
    }
}