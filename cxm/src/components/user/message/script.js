import api, {fetchPost} from '../../../fetch/api'
import {Indicator, Toast} from 'mint-ui'
import {getUrlStr} from '../../../util/common'
export default {
    name: 'message',
    data() {
        return {
            mess: [],
            msgType: 0,
            pageNum: 1,
            loading: false,
            bottomStatus: '',
            allLoaded: false,
            loadText: '上拉加载更多...'
        }
    },
    props:[
        'message'
    ],
    beforeCreate() {
        Indicator.open()
    },
    computed: {  
        tabstatus() {  
            return this.$store.state.recordTab;
        }
      },  
      watch: {
        tabstatus(a,b){
            Indicator.open()
            this.mess = []
            this.pageNum = 1
            if (a == 'm1') {
                this.msgType = 0
            } else if (a == 'm2') {
                this.msgType = 1
            }
            this.loadText = '上拉加载更多...'
            this.allLoaded = false
            this.newsfetch()
        }
      },
    methods: {
        ac(url) {
            location.href=url
        },
        handleTopChange(status) {
            this.bottomStatus = status;
        },
        loadBottom() {
            Indicator.open()
            setTimeout(() => {
                this.pageNum++
                this.newsfetch()
                this.$refs.loadmore.onBottomLoaded();
            }, 700)
        },
        newsfetch() {
            let data = {
                msgType: this.msgType,
                pageNum: this.pageNum,
                pageSize: 20,
            }
            api.newlist(data)
                .then(res => {
                    if (res.code == 0) {
                        //console.log(res)
                        if(res.data.isLastPage == 'true') {
                            this.pageNum = -1
                            this.loadText = '暂无更多数据'
                            this.allLoaded = true
                        }
                        //console.log(this.mess)
                        this.mess = this.mess.concat(res.data.list)
                    }
                })
        }
    },
    created(){
       // this.getRouter()
    },
    mounted() {
        
    },
    beforeRouteEnter(to,from, next){
        if(from.path == '/'||from.path == '/user/activity'){
            next(
                vm=>{
                    vm.$store.dispatch('changeRecordTab','m'+localStorage.getItem('itemStatus'))
                    localStorage.removeItem('itemStatus')
                    //vm.msgType = 1
                }
            )
        }else{
            next(vm=>{
                vm.newsfetch()
            })
        }

    },
    beforeRouteLeave(to, from, next) {
        this.$store.dispatch('changeRecordTab','')
        localStorage.removeItem('itemStatus')
		next()
	}
}