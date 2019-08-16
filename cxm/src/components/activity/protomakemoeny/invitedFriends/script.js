import {nativeApp} from '@/util/common'
import datefilter from '@/util/datefilter'
import {Indicator,MessageBox} from 'mint-ui'
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
        },
        //说明弹窗
        hd_alert(){
            MessageBox.alert(`
            <p style='text-align:left;'>1.该页面（累计总收益）只统计所有成功受邀好友的购彩返利总和；<br />
            2.列表为单个受邀好友给您带来的返利总和</p>
            `).then(action => {
                
            });
        }
    },
    mounted(){
        this.fetchData()
    }
}