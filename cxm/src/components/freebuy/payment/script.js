import api from '../../../fetch/api'
import { MessageBox } from 'mint-ui';
import {
    wxPd
} from '../../../util/common'
import {
    Toast
} from 'mint-ui'
import {
    Indicator
} from 'mint-ui'
export default {
    name: 'payment',
    beforeCreate() {
       
    },
    data() {
        return {
            payment: {},
            allPaymentList: [],
            payCode: 'app_weixin',
            payText: '为了确保支付成功,请保持网络畅通',
            orderId: ''
        }
    },
    created() {
       
    },
    methods: {
        yhClick() {
            this.$store.state.mark_playObj.mark_playBox = true
            this.$store.state.mark_playObj.mark_play = '3'
        },
        fetchData(c,s) {
            let data = {
                bonusId: c,
                payToken: s
            }
            api.unifiedPayBefore(data)
                .then(res => {
                        //console.log(res)
                        if (res.code == 0) {
                            this.payment = res.data
                            this.$store.state.mark_playObj.yhList = res.data.bonusList
                            this.$store.state.mark_playObj.bounsId = res.data.bonusId
                        }
                })
            api.allPayment({})
                .then(res => {
                    if (res.code == 0) {
                        this.allPaymentList = res.data
                        this.payCode = res.data[0].payCode
                    }
                })
        },
        payBtn() {
            if (Number(this.payment.thirdPartyPaid) > 0) {
                Indicator.open()
                let innerWechat = '0',payTypePd=''
                if(this.payCode == 'app_weixin'){  //wx支付逻辑
                    if (wxPd()) {
                        innerWechat = '1'
                    } else {
                        innerWechat = '0'
                    }
                    payTypePd = 'wx'
                }else if(this.payCode == 'app_rongbao'){  //rongbao支付逻辑
                    innerWechat = '0'
                    payTypePd = 'rb'
                }else if(this.payCode == 'app_xianfeng'){  //先锋支付逻辑
                    innerWechat = '0'
                    payTypePd = 'xf'
                }
                let data = {
                    'payCode': this.payCode,
                    'payToken': this.payment.payToken,
                    'innerWechat': innerWechat,
                    'isH5': '1'
                }
                this.payFlag(data,payTypePd)
            } else {
                Indicator.open()
                var data = {
                    'payCode': '',
                    'payToken': this.payment.payToken
                }
                this.payFlag(data,'ye')
            }
        },
        payFlag(c,s){
            api.nUnifiedOrder(c)
                .then(res => {
                    //console.log(res)
                    if (s == 'ye') {
                        if (res.code == 0) {
                            Toast(res.msg)
                            if(this.payment.lotteryClassifyId=='2'){
                                this.$router.replace({
                                    path: '/daletou/programmeDetails',
                                    query: {
                                        id: res.data.orderId,
                                    }
                                })
                            }else{
                                this.$router.replace({
                                    path: '/user/order',
                                    query: {
                                        id: res.data.orderId,
                                    }
                                })
                            }
                        }
                    } else {
                        if (res.code == 0) {
                            localStorage.setItem('matchSaveInfo',JSON.stringify(this.payment))
                            localStorage.setItem('allPaymentList',JSON.stringify(this.allPaymentList))
                            localStorage.setItem('orderId',res.data.orderId)
                            if(s=='rb'){
                                localStorage.setItem('payCode',this.payCode)
                                localStorage.setItem('payLogId',res.data.payLogId)
                                this.orderId = res.data.orderId
                                MessageBox.confirm('',{
                                    message: this.payText,
                                    title: '订单支付',
                                    confirmButtonText: '已完成支付',
                                    cancelButtonText: '重新支付',
                                    closeOnClickModal: false
                                }).then(action => {
                                    Indicator.open()
                                    this.saveStatus(res.data.payLogId)
                                },action => {
                                    Indicator.close()
                                })
                                let url =  location.href+'?orderStatus=1'
                                location.href = res.data.payUrl+ '&h5ck=' + encodeURIComponent(url)
                            }else if(s=='wx'){
                                //location.href = res.data.payUrl
                                location.replace(res.data.payUrl)
                            }else if(s=='xf'){
                               //Toast('功能暂未开放')
                                this.$router.push({
                                    path: '/user/quickinfo',
                                    query:{
                                        id: res.data.payLogId,
                                        from: 'h5'
                                    }
                                })
                            }else{
                                location.replace(res.data.payUrl)
                            }
                        }
                    }
                })
        },
        wxClick(c, index, s) {
            this.payCode = s.payCode
            $('.wxSelected').removeClass('wxSelected')
            this.$refs.wxSelected[index].className = 'wxSelected iconfont icon-icon-29'
        },
        saveStatus(c){
            api.query({'payLogId': c})
                .then(res => {
                    //console.log(res)
                    if (res.code == 0) {
                        if(this.payment.lotteryClassifyId=='2'){
                            this.$router.replace({
                                path: '/daletou/programmeDetails',
                                query: {
                                    id: this.orderId,
                                }
                            })
                        }else{
                            this.$router.replace({
                                path: '/user/order',
                                query: {
                                    id: this.orderId,
                                }
                            })
                        }
                    }else if(res.code=='304036'){
                        MessageBox.confirm('',{
                            message: '暂未查询到您的支付结果，如果您已经确认支付并扣款，可能存在延迟到账的情况，请到账户明细中查看或联系客服查询',
                            title: '查询失败',
                            confirmButtonText: '继续查询',
                            cancelButtonText: '重新支付',
                            closeOnClickModal: false
                        }).then(action => {
                            Indicator.open()
                            setTimeout(()=>{
                                this.saveStatus(c)
                            },3000)
                        },action => {

                        })
                        Indicator.close()
                    }else if(res.code=='304035'){
                        MessageBox.alert('',{
                            message: '如果您已经确认支付并扣款，可能存在延迟到账情况，请到账户明细中查看或联系客服查询',
                            title: '支付失败',
                            confirmButtonText: '重新支付',
                            closeOnClickModal: false
                        }).then(action => {
                            Indicator.close()
                        });
                        Indicator.close()
                    }else{
                        Indicator.close()
                    }
                })
        }
    },
    mounted() {
        if(location.href.split('?')[1]&&location.href.split('?')[1].split('=')[1]==1&&localStorage.getItem('payCode')){
            //console.log(location.href)
            this.payment = JSON.parse(localStorage.getItem('matchSaveInfo'))
            this.orderId = localStorage.getItem('orderId')
            this.allPaymentList = JSON.parse(localStorage.getItem('allPaymentList'))
            this.$store.state.mark_playObj.yhList = this.payment.bonusList
            this.$store.state.mark_playObj.bounsId = this.payment.bonusId
            this.payCode = localStorage.getItem('payCode')
            let payLogId = localStorage.getItem('payLogId')
                MessageBox.confirm('',{
                    message: this.payText,
                    title: '订单支付',
                    confirmButtonText: '已完成支付',
                    cancelButtonText: '重新支付',
                    closeOnClickModal: false
                }).then(action => {
                    Indicator.open()
                    this.saveStatus(payLogId)  
                },action => {
                    Indicator.close()
                })
                this.$nextTick(()=>{
                    localStorage.removeItem('matchSaveInfo')
                    localStorage.removeItem('allPaymentList')
                    localStorage.removeItem('payLogId')
                    localStorage.removeItem('orderId')
                    localStorage.removeItem('payCode')
                })  
        }else if(!localStorage.getItem('payCode')&&localStorage.getItem('allPaymentList')){
            this.payment = JSON.parse(localStorage.getItem('matchSaveInfo'))
            this.orderId = localStorage.getItem('orderId')
            this.allPaymentList = JSON.parse(localStorage.getItem('allPaymentList'))
            this.$nextTick(() => {
                localStorage.removeItem('matchSaveInfo')
                    localStorage.removeItem('allPaymentList')
                    localStorage.removeItem('orderId')
            })
        }
    },
    computed: {
        cc() {
            return this.$store.state.mark_playObj.mybounsId;
        }
    },
    watch: {
        cc(a, b) {
            Indicator.open()
            this.fetchData(a,this.payment.payToken)
        }
    },
    beforeRouteEnter(to, from, next){
        if(from.path=='/'&&localStorage.getItem('orderId')){
            next(vm=>{
                //vm.$store.state.matchSaveInfo = JSON.parse(localStorage.getItem('matchSaveInfo'))
                if(localStorage.getItem('payCode')){
                    vm.payment = JSON.parse(localStorage.getItem('matchSaveInfo'))
                    vm.orderId = localStorage.getItem('orderId')
                    vm.allPaymentList = JSON.parse(localStorage.getItem('allPaymentList'))
                    vm.$store.state.mark_playObj.yhList = vm.payment.bonusList
                    vm.$store.state.mark_playObj.bounsId = vm.payment.bonusId
                    vm.payCode = localStorage.getItem('payCode')
                    let payLogId = localStorage.getItem('payLogId')
                    MessageBox.confirm('',{
                        message: vm.payText,
                        title: '订单支付',
                        confirmButtonText: '已完成支付',
                        cancelButtonText: '重新支付',
                        closeOnClickModal: false
                    }).then(action => {
                        Indicator.open()
                        vm.saveStatus(payLogId)  
                    },action => {
                        Indicator.close()
                    })
                    vm.$nextTick(()=>{
                        localStorage.removeItem('matchSaveInfo')
                        localStorage.removeItem('allPaymentList')
                        localStorage.removeItem('payLogId')
                        localStorage.removeItem('orderId')
                        localStorage.removeItem('payCode')
                    })
                }else{
                    vm.payment = JSON.parse(localStorage.getItem('matchSaveInfo'))
                    vm.orderId = localStorage.getItem('orderId')
                    vm.allPaymentList = JSON.parse(localStorage.getItem('allPaymentList'))
                    vm.$nextTick(()=>{
                        localStorage.removeItem('matchSaveInfo')
                        localStorage.removeItem('allPaymentList')
                        localStorage.removeItem('payLogId')
                        localStorage.removeItem('orderId')
                    })
                }          
            })
            //localStorage.removeItem('matchSaveInfo')
        }else{
            next(vm=>{
            	Indicator.open()
                vm.fetchData('',vm.$route.query.ptk)
            })
        }
    },
    beforeRouteLeave(to, from, next) {
        next()
        this.$store.state.mark_playObj.mark_playBox = false
        this.$store.state.mark_playObj.mark_play = ''
        this.$store.state.mark_playObj.bonusId = ''
        this.$store.state.mark_playObj.mybounsId = ''
    }
}