import {nativeApp} from '@/util/common'
import datefilter from '@/util/datefilter'
import {Indicator} from 'mint-ui'
import api from '@/fetch/api'
export default {
    name: 'invitedFriends',
    data(){
        return {
           invData:{}
        }
    },
    beforeCreate() {
        Indicator.open()
    },
    created(){
        nativeApp({'methodName':'showTitle','title':'受邀好友'})
    },
    methods:{
        //数据
        fetchData(){
            api.queryResultAccount({str:''})
            .then(res => {
                if (res.code == 0) {
                    this.invData = res.data
                }
            })
        },
        //日期格式化
        dateGsh(c){
            return datefilter(Number(c)*1000, 0)+' '+datefilter(Number(c)*1000, 1);
        }
    },
    mounted(){
        this.fetchData()
    }
}