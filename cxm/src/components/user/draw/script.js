import api from '../../../fetch/api'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import {nativeApp} from '../../../util/common.js'
export default {
    name: 'draw',
    beforeCreate() {
			Indicator.open()
    },
    data () {
      return {
        id: this.$route.query.id,
        drawObj: {}
      }
    },
    created(){
      nativeApp({'methodName':'showTitle','title':'出票方案'})
    },
    methods:{
      statusZt(c){
        switch(c){
          case '0' : return '待出票'
          case '1' : return '已出票'
          case '2' : return '出票失败'
          case '3' : return '出票中'
        }
      }
    },
    mounted(){
      let data = {
        'orderSn': this.$route.query.orderSn,
        'programmeSn': this.id
      }
      api.getTicketScheme(data)
      .then(res => {
          if(res.code==0) {
            //console.log(res)
            this.drawObj = res.data
          }
      })
    }
}