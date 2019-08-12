import {nativeApp} from '@/util/common'
import datefilter from '@/util/datefilter'
import {Indicator,Toast,MessageBox} from 'mint-ui'
import api from '@/fetch/api'
export default {
    name: 'mygrossincome',
    data(){
        return {
            value: false,
            turn: false,
            mgriData:{}
        }
    },
    beforeCreate() {
        Indicator.open()
    },
    created(){
        nativeApp({'methodName':'showTitle','title':'我的总收益'})
    },
    methods:{
        //开关控制动画
        turnOn(){
            this.turn = !this.turn;
        },
        //数据
        fetchData(){
            api.queryAllAccount({str:''})
            .then(res => {
                if (res.code == 0) {
                    this.mgriData = res.data
                }
            })
        },
        //日期格式化
        dateGsh(c){
            return datefilter(Number(c)*1000, 0)+' '+datefilter(Number(c)*1000, 1);
        },
        //转入余额
        switchTo(){
            if(Number(this.mgriData.withdrawable_reward)<=0){
                Toast('暂无可提现金额');
            }else{
                MessageBox.confirm('',{
                    message: `<p>确认将<span style='color:#DF313F;'>${this.mgriData.withdrawable_reward}元</span><p>
                              <p>全部转入可提现账户?</p>
                            `,
                    title: '',
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                }).then(action => {
                    Indicator.open();
                    api.rewardToMoney({str:''})
                    .then(res => {
                        if (res.code == 0) {
                            Toast(res.data)
                            this.fetchData()
                        }
                    })
                },action =>{

                })
            }
        }
    },
    mounted(){
        this.fetchData()
    }
}