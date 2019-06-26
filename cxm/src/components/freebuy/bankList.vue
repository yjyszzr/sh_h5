<template>
    <div class="bank-list">
        <form action=http://www.ddcxpay.com/Platform/pay/H5KPay.do method='post' id='myform'>
            <input v-show=false type="text" name="data" value='' class="da">
            <input v-show=false type="text" name="signature" value='' class="sig">
        </form>
    </div>
</template>

<script>
    import api from '../../fetch/api'
    import {Indicator} from 'mint-ui'
    export default {
        name: "bank-list",
        data(){
            return{
                payUrl: "",
                data:'',
                signature:'',
            }
        },
        mounted(){
            Indicator.open()
            this.getnUnifiedOrder()
        },
        methods:{
            //获取银行加密信息
            getnUnifiedOrder(){
                var that = this
                let data = {
                    orderId: this.$route.query.orderId,
                    payLogId: this.$route.query.payLogId
                }
                api.nUnifiedOrderUbey(data).then(res=>{
                    if(res.code == '0'){
                        // that.data = res.data.data
                        // that.signature = res.data.signature
                        // that.payUrl = res.data.payUrl
                        $('.da').val(res.data.data)
                        $('.sig').val(res.data.signature)
                        $('#myform').submit()
                    }
                })
            },
        }

    }
</script>
<style scoped lang=scss>
    @import '../../assets/css/function.scss';
</style>