import api from '../../../fetch/api'
import { Toast } from 'mint-ui'
import { Indicator } from 'mint-ui'
export default {
    name: 'detail',
    data () {
      return {
        loading: false,
        status: 0,  //账户类型
        pageNum: 1,   //初始页码
        yhList: [],
        bottomStatus: '',
        allLoaded: false,
        loadText: '上拉加载更多...',
          activeColor:'#666',
          curColor:'#999'
      }
    },
    beforeCreate() {
			Indicator.open()
		},
    created(){
      
    },
    methods: {
      handleTopChange(status) {
        this.bottomStatus = status;
      },
      loadBottom() {
        Indicator.open()
        setTimeout(() => {
            this.pageNum++
            this.yhData()
            this.$refs.loadmore.onBottomLoaded();
        }, 700)
      },
      yhData(){
        let data = {
          'status': this.status,
          'pageSize': 20,
          'pageNum': this.pageNum
        }
        api.queryBonusListByStatus(data)
        .then(res => {
            if(res.code==0) {
                //console.log(res)
              if(res.data.isLastPage == 'true') {
                    this.pageNum = -1
                    this.loadText = '暂无更多数据'
                		this.allLoaded = true
              }
              this.yhList = this.yhList.concat(res.data.list)
            }
        })
      },
      goFreebuy(){
          this.$store.commit('FREEBUYID','6')
          this.$router.push({
            path: '/lottery/freebuy/singleNote'
          })
      }
    },
    computed: {  
      tabstatus() {  
          return this.$store.state.recordTab; 
      }
    },  
    watch: {
      tabstatus(a,b){
        Indicator.open()
        this.yhList = []
        this.pageNum = 1
        if(a=='d1'){
          this.status = 0
        }else if(a=='d2'){
          this.status = 1
        }else if(a=='d3'){
          this.status = 2
        }
        this.loadText = '上拉加载更多...'
        this.allLoaded = false
        this.yhData()
      }
    },
    mounted(){
        this.yhData()
    }
}