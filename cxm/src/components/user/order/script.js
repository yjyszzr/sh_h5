import api from '../../../fetch/api'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import {nativeApp,isWebview} from '../../../util/common.js'
import {mapState} from 'vuex'
export default {
    name: 'order',
    beforeCreate() {
			Indicator.open()
    },
    data () {
      return {
        orderId: this.$route.query.id,
        orderObj: ''
      }
    },
    created(){
      nativeApp({'methodName':'showTitle','title':'方案详情'})
    },
    methods: {
      goDraw(c){
        this.$router.push({
          path: '/user/draw',
          query: {
            id: c,
            orderSn: this.orderObj.orderSn
          },
          replace: false
        })
      },

      jxtz(){
        if(!isWebview()){
          this.$store.commit('FREEBUYID',this.orderObj.lotteryPlayClassifyId)
          this.$router.push({
            path: '/lottery/freebuy/singleNote'
          })
        }else{
          nativeApp({'methodName':'pushUrl','url':'http://caixiaomi.net?cxmxc=scm&type=3&id='+this.orderObj.lotteryClassifyId})
        }
      },
      color(){
        let channelcolor = "#ea5504"
        if(isWebview()){
          channelcolor = this.channelObj.color
        }
        return channelcolor;
      }
    },
    mounted(){
        let data = {
          'orderId': this.orderId
        }
        api.getOrderDetail(data)
        .then(res => {
            if(res.code==0) {
              this.orderObj = res.data
            }
        })
    },
    computed: {
      ...mapState({
           channelObj: state => state.channelObj
      })
    },
    beforeRouteLeave(to, from, next) {
      if(to.path!='/freebuy/cathectic'){
        next()
      }else{
        this.$store.state.matchSelectedList = []
        localStorage.removeItem('tab')
        this.$router.push({path: '/'})
      }
    }
}