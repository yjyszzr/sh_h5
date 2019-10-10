<template>
    <div class="unionPay">
        <div class="un-one">
            <img src="./img/yl.png" alt="">
            <p>欢迎使用银联支付</p>
        </div>
        <div class="un-two">
            <p>支付卡号: {{cardNoHide}}</p>
            <p>您的充值金额: <span>{{$route.query.amount}}元</span></p>
        </div>
        <div class="un-three">
            <span>验证码:</span>
            <div class="code-box">
                <input type="tel" maxlength="6" name="" id="" placeholder="请输入验证码">
                <button v-if="!codeBtnController.end" :disabled='codeBtnController.disabled'>{{codeBtnController.text}}s</button>
                <button v-else @click="reGetCode()">重新获取</button>
            </div>
        </div>
        <div class="un-five">
            <p>注:请在倒计时内完成支付，过期此笔充值</p>
            <p>会失效，您需返回APP重新发起充值!</p>
        </div>
        <div class="un-btn">
            确认
        </div>
    </div>
</template>

<script>
    import api from '../../fetch/api'
    import {Indicator} from 'mint-ui'
    export default {
        name: "unionPay",
        data() {
            return {
                cardNoHide: '', //支付卡号
                phone: '', //电话
                codeBtnController:{
                    disabled: false,
                    text: 120,
                    end: false
                }
            }
        },
        beforeCreate(){
            Indicator.open()
        },
        mounted(){
            this.init()
        },
        methods:{
            //个人信息
            async getForPageInfo(){
                let res = await api.forPageInfo({
                    merCustId: this.$route.query.merCustId
                })
                if (res.code == 0) {
                    this.cardNoHide = res.data.cardNoHide
                    this.phone = res.data.phone
                }
            },
            //验证码
            async getYzCode(){
                let {
                    amount,
                    merCustId
                } = this.$route.query
                let res = await api.forRecharge({
                    totalAmount: amount,
                    phone: this.phone,
                    merCustId
                })
                this.timeSet()
                if (res.code == 0) {
                    console.log(res)
                }
            },
            //初始化
            async init(){
                await this.getForPageInfo()
                await this.getYzCode()
            },
            //倒计时
            timeSet(){
                let timer = setInterval(()=>{
                    this.codeBtnController.text--
                    if(this.codeBtnController.text<=0){
                        clearInterval(timer)
                        this.codeBtnController.end = true
                    }
                },1000)
            },
            //重新获取
            reGetCode(){
                Indicator.open()
                this.codeBtnController.text = 120
                this.codeBtnController.end = false
                this.timeSet()
                this.getYzCode()
            }
        }
    }
</script>

<style scoped lang='scss'>
    @import '../../assets/css/function.scss';
    .unionPay{
        background: white;
        min-height: 100%;
        padding-top: px2rem(90px);
        box-sizing: border-box;
        .un-one{
            img{
                width: 38%;
                display: block;
                margin: 0 auto;
            }
            p{
                font-size: px2rem(30px);
                color: #505050;
                text-align: center;
                margin: px2rem(30px) 0 px2rem(60px);
            }
        }
        .un-two{
            p:first-of-type{
                font-size: px2rem(30px);
                color: #505050;
                text-align: center;
            }
            p:last-of-type{
                font-size: px2rem(40px);
                color: 404040;
                text-align: center;
                margin: px2rem(10px) 0 px2rem(80px);
                span{
                    color: #dc3c32;
                }
            }
        }
        .un-three{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: px2rem(40px);
            span{
                color: #505050;
                font-size: px2rem(28px);
            }
            .code-box{
                width: px2rem(340px);
                height: px2rem(50px);
                display: flex;
                align-items: center;
                position: relative;
                margin-left: px2rem(5px);
                input{
                    height: 100%;
                    width: 100%;
                    border-radius: px2rem(5px);
                    border-color: #ccc;
                    padding-left: px2rem(10px);
                    font-size: px2rem(26px);
                    color: #505050;
                }
                button{
                    width: px2rem(120px);
                    margin-left: px2rem(-121px);
                    height: 100%;
                    border: none;
                    background: #fff;
                    border-left: 1px solid #ccc;
                    font-size: px2rem(28px);
                    color: #dc3c32;
                }
            }
        }
        .un-five{
            margin: px2rem(20px) 0 px2rem(50px);
            color: #dc3c32;
            p{
                text-align: center;
                line-height: px2rem(40px);
                font-size: px2rem(26px);
            }
        }
        .un-btn{
            background: #dc3c32;
            font-size: px2rem(32px);
            color: #fff;
            width: px2rem(440px);
            height: px2rem(68px);
            text-align: center;
            display: block;
            line-height: px2rem(68px);
            margin: px2rem(60px) auto px2rem(20px);
            border-radius: px2rem(8px);
        }
    }
</style>