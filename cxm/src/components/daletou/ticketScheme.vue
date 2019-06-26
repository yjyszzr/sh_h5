<template>
    <div class="tickt-scheme">
        <!--躯干-->
        <div class="body">
            <div class="body-in">
                <p class="body-in-title">方案编号：{{orderSn}}</p>
                <div class="message">
                    <p>投注信息</p>
                    <p>状态</p>
                </div>
                <ul class="my-num-ul" v-if="ticketList.length<=0">
                    <li class="my-num-li" style="border:none;">
                        <div class="num-box">
                            —
                        </div>
                        <p class="tickt-status">待出票</p>
                    </li>
                </ul>
                <ul class="my-num-ul" v-else>
                    <li class="my-num-li" v-for="(item,index) in ticketList" :key=index :class="ticketList.length-1==index?'border-none':''">
                        <div class="num-box">
                            <template>
                                <ul class="num-sun-ul"  v-if="item.playType == '2'">
                                    <div class="left">
                                        <li class="num-sun-li redBall" v-for="(sunItem,i) in item.redDanCathectics" :key='i'>{{sunItem.cathectic}}</li>
                                    </div>
                                    <li class="dan-line">—</li>
                                    <div class="left">
                                        <li class="num-sun-li redBall" v-for="(sunItem,i) in item.redTuoCathectics" :key='i'>{{sunItem.cathectic}}</li>
                                    </div>
                                    <li class="dan-line">—</li>
                                    <div class="right" v-show="item.blueDanCathectics.length>0">
                                        <li class="num-sun-li blueBall" v-for="(sunItem,i) in item.blueDanCathectics" :key='i'>{{sunItem.cathectic}}</li>
                                    </div>
                                    <li class="dan-line" v-show="item.blueDanCathectics.length>0">—</li>
                                    <div class="right">
                                        <li class="num-sun-li blueBall" v-for="(sunItem,i) in item.blueTuoCathectics" :key='i'>{{sunItem.cathectic}}</li>
                                    </div>
                                </ul>
                                <ul class="num-sun-ul" v-else>
                                    <div class="left">
                                        <li class="num-sun-li redBall" v-for="(sunItem,i) in item.redCathectics" :key='i'>{{sunItem.cathectic}}</li>
                                    </div>
                                    <div class="right">
                                        <li class="num-sun-li blueBall" v-for="(sunItem,i) in item.blueCathectics" :key='i'>{{sunItem.cathectic}}</li>
                                    </div>
                                </ul>
                                <p class="num-details">
                                    {{item.playType=='2'?'胆拖':item.playType=='1'?'复式':'单式'}} {{item.betNum}}注 {{item.cathectic}}倍 {{item.amount}}元 {{item.isAppend=='0'?'':'已追加'}}
                                </p>
                            </template>
                        </div>
                        <p class="tickt-status">{{status(item.status)}}</p>
                    </li>
                </ul>
            </div>
        </div>


    </div>
</template>
<style scoped lang="scss">
    @import "../../assets/css/function.scss";

    .tickt-scheme {
        .body {
            width: 100%;
            background-color: #ffffff;
            .body-in{
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                padding: px2rem(20px);
                color: #505050;
                font-size: px2rem(26px);
                .border-none{
                    border-bottom: 0 none!important;
                }
                .body-in-title{

                    border-bottom: 1px solid #f0f0f0;
                    padding-bottom: px2rem(20px);
                    padding-left: px2rem(15px);
                    color: #9f9f9f;
                    font-size: px2rem(28px);
                }
                .message{
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    padding: px2rem(15px);
                    color: #9f9f9f;
                    font-size: px2rem(28px);
                }
                .redBall {
                    color: #eb1c24 !important;
                    border: 1px solid #c7c7c7;
                }
                .blueBall {
                    color: #0081cc !important;
                    border: 1px solid #c7c7c7;
                }
                .my-num-ul{
                    width: 100%;
                    overflow: hidden;
                    .my-num-li{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px dotted #c7c7c7;
                        padding: px2rem(15px);
                        .num-box{
                            overflow: hidden;
                            min-width: 75%;
                        }
                        .num-sun-ul{
                            overflow: hidden;
                            .left,.right{
                                li{
                                    float: left;
                                }
                            }
                            .dan-line{
                                float: left;
                                line-height:1.1rem;
                                color:#c7c7c7;
                                display:inline-block;
                            }
                            .num-sun-li{
                                line-height: px2rem(60px);
                                width: px2rem(60px);
                                text-align: center;
                                font-size: px2rem(26px);
                                border-radius: 100%;
                                margin: px2rem(10px) px2rem(5px);
                            }
                        }
                        .num-details{
                            font-size: px2rem(28px);
                            color: #9f9f9f;
                            padding-left: px2rem(15px);
                        }
                        .tickt-status{
                            width: 20%;
                            min-width: px2rem(110px);
                            color: #ea5504;
                            text-align: right;
                        }
                    }
                }
            }
        }
    }
</style>
<script>
    import {Indicator} from 'mint-ui';
    import api from '../../fetch/api.js'
    import {nativeApp} from '../../util/common.js'
    export default {
        name: "ticktScheme",
        data() {
            return {
                orderSn: this.$route.query.orderSn,
                ticketList:[],
            }
        },
        mounted(){
            nativeApp({'methodName':'showTitle','title':'出票方案'})
            this.fetchData()
        },
        methods:{
            fetchData(){
                let data = {
                    orderSn: this.orderSn,
                    programmeSn: this.orderSn
                }
                api.getLottoTicketScheme(data)
                .then(res => {
                    if (res.code == 0) {
                        this.ticketList = res.data.lottoTicketSchemeDetailDTOs
                    }
                })
            },
            status(c){
                switch (c){
                    case '0': return '等待出票';
                    case '1': return '出票成功';
                    case '2': return '出票失败';
                    case '3': return '出票中';
                }
            }
        },
        beforeRouteLeave(to, from, next) {
            next()
        }
    }
</script>

