import api from '../../../fetch/api'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
import {nativeApp,getCsUrl,isWebview} from '../../../util/common.js'
import {mapState} from 'vuex'
export default {
    name: 'record',
    data () {
      return {
        loading: false,
        orderStatus: '-1',  //账户类型
        pageNum: 1,   //初始页码
        recordList: [],
        bottomStatus: '',
        allLoaded: false,
        searchBarFixed: false,
        loadText: '上拉加载更多...'
        // firstIn: ''
      }
    },
    beforeCreate() {
			Indicator.open()
    },
    created(){
      
    },
    methods:{
      handleTopChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        Indicator.open()
        setTimeout(() => {
            this.pageNum++
            this.recordFetch()
            this.$refs.loadmore.onBottomLoaded();
        }, 700)
      },
      color(c){
        if(c=='5'||c=='6'){
          return '#ea5504'
        }else if(c=='2'||c=='4'){
          return '#c7c7c7'
        }else{
          return '#505050'
        }
      },
      recordFetch(){
        let data = {
          'lotteryClassifyId': 1,
          'orderStatus': this.orderStatus,
          'pageSize': 20,
          'pageNum': this.pageNum
        }
        api.getOrderInfoList(data)
        .then(res => {
          //console.log(res)
            if(res.code==0) {
              if(res.data.isLastPage == 'true') {
                    this.pageNum = -1
                    this.loadText = '暂无更多数据'
                		this.allLoaded = true
              }
              this.recordList = this.recordList.concat(res.data.list)
            }
        })
      },
      goDetail(c){
        if(!isWebview()){
          if(c.lotteryClassifyId=='2'){
            this.$router.push({
                path: '/daletou/programmeDetails',
                query: {
                    id: c.orderId,
                }
            })
          }else{
            this.$router.push({
              path: '/user/order',
              query: {
                id: c.orderId
              },
              replace: false
            })
          }
        }else{
          if(c.lotteryClassifyId=='2'){
            nativeApp({'methodName':'pushUrl','url':getCsUrl()+'/daletou/programmeDetails?cxmxc=scm&type=1&id='+c.orderId})
          }else{
            nativeApp({'methodName':'pushUrl','url':getCsUrl()+'/user/order?cxmxc=scm&type=1&id='+c.orderId})
          }
        }
      }
    }, 
    watch: {
      tabstatus(a,b){
        //console.log(a)
        if(a===''){
          return false;
        }
        Indicator.open()
        this.recordList = []
        this.pageNum = 1
        if(a=='1'){
          this.orderStatus = '-1'
        }else if(a=='2'){
          this.orderStatus = '5'
        }else if(a=='3'){
          this.orderStatus = '3'
        }
        this.loadText = '上拉加载更多...'
        this.allLoaded = false
        this.recordFetch()
      }
    },
    computed: {
      ...mapState({
           channelObj: state => state.channelObj,
           tabstatus:  state => state.recordTab
      })
    },
    mounted(){
      if(!isWebview()){
        this.recordFetch()
      }else{
        window.actionMessage = (arg)=> {
            localStorage.setItem('token', JSON.parse(arg).token)
            this.recordFetch()
        }
        nativeApp({'methodName':'showTitle','title':'投注记录'})
        nativeApp({'methodName':'getToken'})
      }
      if(this.$store.state.recordTab!=''&&this.$store.state.recordTab!='1'){
        if(this.$store.state.recordTab=='2'){
          this.orderStatus = '5'
        }else{
          this.orderStatus = this.$store.state.recordTab
        }
      }
    },
    // activated(){
    //   document.getElementById('content').scrollTop = this.$root.orderScrolltop
    //   //sessionStorage.removeItem('orderScrolltop')
    //   if(sessionStorage.getItem('firstIn')==1){
    //     this.firstIn = true
    //   }else{
    //     this.firstIn = false
    //   }
    //   if(this.firstIn){
    //    // console.log(this.recordList)
    //     Indicator.open();
    //     //console.log(this.firstIn)
    //     setTimeout(()=>{
    //     sessionStorage.removeItem('firstIn')
    //     this.recordList = []
    //     this.orderStatus = '-1'
    //     this.pageNum = 1
    //     this.loadText = '上拉加载更多...'
    //     this.allLoaded = false
    //     this.recordFetch()
    //     },50)
    //   }
    // },
    // beforeRouteEnter(to, from, next) {
    //   if(from.path=='/user'){
    //     next(vm=>{
    //       vm.recordList = []
    //     }) 
    //   }else{
    //     next()
    //   }
    // }
}