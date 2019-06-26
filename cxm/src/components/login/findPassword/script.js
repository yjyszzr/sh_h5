import api from '../../../fetch/api'
import { Toast } from 'mint-ui'
export default {
    name: 'find',
    data () {
      return {
        phoneVal: ''
      }
    },
    methods:{
      next(){
        let data = {
          'mobileNumber': this.phoneVal
        }
        api.validateMobile(data)
        .then(res => {
            if(res.code==0) {
              this.$store.dispatch("changeFindphone",this.phoneVal)
              this.$router.push({
                  path: '/user/revise',
                  replace: true
              })
            }
        })
      },
      handleCommentFocus(){
        this.$refs.sjh.style.color = '#505050'
      },
      handleCommentBlur(){
        this.$refs.sjh.style.color = '#9f9f9f'
      },
    },
    mounted(){
        
    }
}