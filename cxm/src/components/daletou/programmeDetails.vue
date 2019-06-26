<template>
    <div class="programme-details">
        <!--躯干-->
        <div class="body">
            <div class="body-top">
                <div class="body-title">
                    <div class="title-one">
                        <div class="log">
                            <img class="ltto-log" :src="orderObj.lotteryClassifyImg" alt="">
                            <div class="log-text">
                                <p>大乐透  {{orderObj.termNum}}期</p>
                                <p>￥ {{orderObj.ticketAmount}}</p>
                            </div>
                        </div>
                        <img v-if="orderObj.orderStatus=='5'||orderObj.orderStatus=='6'||orderObj.orderStatus=='7'" class="ltto-log" src="./images/Prize@3x.png" alt="">
                        <img v-if="orderObj.orderStatus=='4'" class="ltto-log" src="./images/NoPrize@3x.png" alt="">
                    </div>
                    <div class="programme">
                        <div class="programme-type">
                            <p>方案状态</p>
                            <p v-show="orderObj.orderStatus=='5'||orderObj.orderStatus=='6'||orderObj.orderStatus=='7'">中奖金额</p>
                            <p style="color:#9f9f9f;" v-show="orderObj.orderStatus=='4'">感谢您助力</p>
                        </div>
                        <div class="programme-money">
                            <p>{{orderObj.orderStatusDesc}}</p>
                            <p v-if="orderObj.orderStatus=='2'" style="color:#505050;">资金已退回</p>
                            <p v-if="orderObj.orderStatus=='4'" style="color:#9f9f9f;">公益事业</p>
                            <p v-if="orderObj.orderStatus=='5'||orderObj.orderStatus=='6'||orderObj.orderStatus=='7'">￥{{orderObj.winningMoney}}</p>
                        </div>
                    </div>
                </div>
                <div class="num" v-if="orderObj.prizeNum">
                    <template v-if="orderObj.prizeNum.length>0">
                        <p>开奖号码</p>
                        <ul class="num-ul">
                            <li :class="[index==5||index==6?'allblueBall':'allredBall',index==5?'spance':'']" v-for="(item,index) in orderObj.prizeNum" :key=index >{{item}}</li>
                        </ul>
                    </template>
                    <template v-if="orderObj.prizeNum.length<=0">
                        <p>开奖时间</p>
                        <p class="num-ul">{{orderObj.prePrizeInfo}}</p>
                    </template>
                </div>
            </div>

            <div class="my-num">
                <div class="touzhu-mes">
                    <p class="my-num-title">投注信息</p>
                    <div class="my-num-main">
                        <ul class="my-num-ul" >
                            <li class="my-num-li" v-for="(item,index) in ticketSchemeDetailDTOs" :key=index>
                                <template v-if="item.ballType == 'biaozhun'">
                                    <ul class="num-sun-ul" >
                                        <li class="num-sun-li" :class="sunItem.isGuess=='1'?sunItem.type=='redBall'?'allredBall':sunItem.type=='blueBall'?'allblueBall':'space':sunItem.type=='redBall'?'redBall':sunItem.type=='blueBall'?'blueBall':'space'" v-for="(sunItem,index) in item.ballList" :key=index>{{sunItem.num}}</li>
                                    </ul>
                                    <p class="num-details">
                                        <span v-if="item.playType == '0'">单式</span>
                                        <span v-if="item.playType == '1'">复式</span>
                                        <span>{{item.betNum}}注</span>
                                        <span>{{item.cathectic}}倍</span>
                                        <span>{{item.amount+'.00'}}元</span>
                                        <span v-if="item.isAppend == '1'">已追加</span>
                                    </p>
                                </template>
                                <template v-else>
                                    <ul class="num-sun-ul" >
                                        <li class="num-sun-li" :class="sunItem.isGuess=='1'?sunItem.type=='danRedBall'||sunItem.type=='tuoRedBall'?'allredBall':sunItem.type=='danBlueBall'||sunItem.type=='tuoBlueBall'?'allblueBall':'line':sunItem.type=='danRedBall'||sunItem.type=='tuoRedBall'?'redBall':sunItem.type=='danBlueBall'||sunItem.type=='tuoBlueBall'?'blueBall':'line'" v-for="(sunItem,index) in item.ballList" :key=index>{{sunItem.num}}</li>
                                    </ul>
                                    <p class="num-details">
                                        <span v-if="item.playType == '0'">单式</span>
                                        <span v-if="item.playType == '1'">复式</span>
                                        <span v-if="item.playType == '2'">胆拖</span>
                                        <span>{{item.betNum}}注</span>
                                        <span>{{item.cathectic}}倍</span>
                                        <span>{{item.amount+'.00'}}元</span>
                                        <span v-if="item.isAppend == '1'">已追加</span>
                                    </p>
                                </template>
                            </li>
                        </ul>
                    </div>
                    <router-link to="/daletou/playHelp"> <p class="question"> 奖金如何计算?</p></router-link>
                </div>

                <div class="touzhu-mes">
                    <div class="my-num-title">
                        <span>方案信息</span>
                        <div class="look-programme" @click = "goProm()">
                            <span>查看出票方案</span><img src="../../assets/img/arange.png" alt="">
                        </div>
                    </div>
                    <div class="my-num-main">
                        <ul class="prgram-detail">
                            <li>
                                <p>方案编号：</p>
                                <p>{{orderObj.programmeSn}}</p>
                            </li>
                            <li>
                                <p>创建时间：</p>
                                <p>{{orderObj.createTime}}</p>
                            </li>
                            <li>
                                <p>店主接单：</p>
                                <p>{{orderObj.acceptTime}}</p>
                            </li>
                            <li>
                                <p>店主出票：</p>
                                <p>{{orderObj.ticketTime}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>


        <div class="footer">
            <p :style="{'background':color()}" @click="goOnBuy()">继续购买此号</p>
            <p :style="{'background':color()}" @click="goSelectNum()">继续购买大乐透</p>
        </div>


    </div>
</template>
<style scoped lang="scss">
    @import "../../assets/css/function.scss";

    .programme-details {
        .spance{
            margin-left: px2rem(30px) !important;
        }
        .allredBall{
            background-color: #eb1c24 !important;
            border: 1px solid #eb1c24 !important;
            color: #ffffff;
        }
        .allblueBall{
            background-color: #0081cc !important;
            border: 1px solid #0081cc !important;
            color: #ffffff;
        }
        .redBall {
            color: #eb1c24 !important;
            border: 1px solid #c7c7c7;
        }
        .blueBall {
            color: #0081cc !important;
            border: 1px solid #c7c7c7;
        }
        .line{
            width: 8px!important;
            color: #c7c7c7;
            text-align: center;
            overflow: hidden;
        }
        .space{
            width: 8px!important;
            color: #c7c7c7;
            text-align: center;
            overflow: hidden;
            visibility: hidden;
        }

        .num {
            box-sizing: border-box;
            margin-top: px2rem(10px);
            padding-left: px2rem(32px);
            display: flex;
            height: px2rem(110px);
            align-items: center;
            background-color: #ffffff;
            p{
                font-size: px2rem(30px);
                color: #9f9f9f;
            }
            .num-ul {
                display: flex;
                flex-direction: row;
                margin-left: px2rem(20px);
                li{
                    line-height: px2rem(60px);
                    width: px2rem(60px);
                    text-align: center;
                    font-size: px2rem(26px);
                    color: #ffffff;
                    background-color: black;
                    border-radius: 100%;
                    margin: 0 px2rem(5px);
                }
            }
        }
        .body{
            width: 100%;
            box-sizing: border-box;
            position: absolute;
            bottom: px2rem(100px);
            top: px2rem(0px);
            overflow: auto;
            .body-top{
                width: 100%;
                .body-title{
                    background-color: #ffffff;
                    padding: px2rem(20px);
                    .title-one{
                        box-sizing: border-box;
                        padding: 0 px2rem(15px) px2rem(20px) px2rem(15px);
                        border-bottom: 1px solid #f0f0f0;
                        display: flex;
                        justify-content: space-between;
                        .ltto-log{
                            height: px2rem(70px);
                            width: px2rem(70px);
                        }
                        .log{
                            display: flex;
                            flex-direction: row;
                            .log-text{
                                p:nth-child(1){
                                    font-weight: 700;
                                    font-size: px2rem(28px);
                                    color: #505050;
                                }
                                p:nth-child(2){
                                    color: #9f9f9f;
                                }
                                margin-left: px2rem(20px);
                            }
                        }
                    }
                    .programme{
                        box-sizing: border-box;
                        padding: px2rem(15px) px2rem(15px) 0 px2rem(15px);
                        display: flex;
                        justify-content: space-between;
                        flex-direction: column;
                        div{
                            display: flex;
                            justify-content: space-between;
                        }
                        .programme-type{
                            color: #9f9f9f;
                            font-size: px2rem(28px);
                        }
                        .programme-money{
                            margin-top: px2rem(5px);
                            font-size: px2rem(28px);
                            p:nth-child(1){
                                color: #505050;
                            }
                            p:nth-child(2){
                                color: #EA5504;
                            }
                        }
                    }
                }
            }
            .my-num{
                box-sizing: border-box;
                width: 100%;
                .touzhu-mes{
                    margin-top: px2rem(10px);
                    background-color: #ffffff;
                    padding-bottom: px2rem(20px);
                }
                /*padding: 0 px2rem(15px) px2rem(15px) px2rem(15px);*/
                .my-num-title{
                    padding: px2rem(15px);
                    margin: 0 px2rem(15px);
                    color: #9f9f9f;
                    border-bottom: 1px solid #f0f0f0;
                    display: flex;
                    font-size: px2rem(26px);
                    justify-content: space-between;
                    .look-programme{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: #505050;
                        img{
                            margin-left: px2rem(15px);
                            height: px2rem(25px);
                            width: px2rem(15px);
                        }
                    }

                }
                .my-num-main{
                    box-sizing: border-box;
                    width: 100%;
                    padding: 0 px2rem(20px);
                    .my-num-ul{
                        .my-num-li{
                            margin-top: px2rem(15px);
                            .num-sun-ul{
                                display: flex;
                                flex-direction: row;
                                flex-wrap: wrap;
                                margin-top: px2rem(20px);
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
                                padding-left: px2rem(10px);
                            }
                        }
                    }
                }
                .prgram-detail{
                    margin-top: px2rem(20px);
                    margin-left: px2rem(10px);
                    li{
                        display: flex;
                        flex-direction: row;
                        justify-items: center;
                        align-items: center;
                        p:nth-child(1){
                            color: #787878;
                            font-size: px2rem(26px);
                        }
                        p:nth-child(2){
                            margin-left: px2rem(10px);
                            color: #505050;
                            font-size: px2rem(26px);
                        }
                    }
                }
                .question{
                    margin-left: px2rem(30px);
                    margin-top: px2rem(20px);
                    font-size: px2rem(26px);
                    color: #f5911e;
                }
            }
        }
        .footer {
            box-sizing: border-box;
            width: 100%;
            position: absolute;
            bottom: 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            p{
               line-height: px2rem(100px);
                text-align: center;
                color: #ffffff;
                width: 49.7%;
                background-color: #EA5504;
                font-size: px2rem(28px);
            }
        }
    }
</style>
<script>
    import api from '../../fetch/api'
    import {Indicator} from 'mint-ui';
    import SelectionBox from "./images/SelectionBox1@3x.png"
    import Selected from "./images/Selected1@3x.png"
    import {nativeApp,isWebview} from '../../util/common.js'
    import {mapState} from 'vuex'
    export default {
        name: "programmeDetails",
        data() {
            return {
                orderObj: {},
                kaijiangNum:[],//开奖号码
                ticketSchemeDetailDTOs:[],
                adds: {
                    add:'',  //是否追加 默认不追加
                    imgUrl: '',
                    zhuNum:0,
                    bei: 1,
                    money:0,
                    itemEditIndex:-1,
                },
                goOn:false
            }
        },
        created(){
            nativeApp({'methodName':'showTitle','title':'方案详情'})
            this.getLottoOrderDetailFn()
        },
        mounted(){},
        methods:{
            goProm(){
                this.$router.push({
                    path:"/daletou/ticketScheme",
                    query:{
                        orderSn: this.orderObj.orderSn
                    }
                })
            },
            //获取详情
            getLottoOrderDetailFn() {
                api.getLottoOrderDetail({
                    orderId: this.$route.query.id
                }).then(res => {
                        if (res.code == 0) {
                            this.orderObj = res.data
                            this.dataHandel(res.data.cathecticResults)
                        }
                    })
            },
            //数据处理
            dataHandel(dataArr){
                var that = this
                var arr  = []
                dataArr.forEach((item,index)=>{
                    if(item.isAppend == '0'){
                        that.adds.add = false
                        that.adds.imgUrl = SelectionBox
                    }
                    if(item.isAppend == '1'){
                        that.adds.add = true
                        that.adds.imgUrl = Selected
                    }
                    that.adds.money = that.adds.money+item.amount
                    that.adds.zhuNum = that.adds.zhuNum+item.betNum
                    that.adds.bei = item.cathectic
                    arr.push({
                        amount:item.amount,
                        betNum:item.betNum,
                        cathectic:item.cathectic,
                        isAppend:item.isAppend,
                        playType:item.playType,
                        ballType:'',
                        ballList:[]
                    })
                    if(item.playType!='2'){
                        arr[index].ballType = 'biaozhun'
                        item.redCathectics.forEach(sunItem=>{
                            arr[index].ballList.push({
                                num:sunItem.cathectic,
                                type:'redBall',
                                isGuess:sunItem.isGuess
                            })
                        })
                        arr[index].ballList.push({
                            num:'—',
                            type:'line',
                            isGuess:'0'
                        })
                        item.blueCathectics.forEach(sunItem=>{
                            arr[index].ballList.push({
                                num:sunItem.cathectic,
                                type:'blueBall',
                                isGuess:sunItem.isGuess
                            })
                        })
                    }
                    else{
                        arr[index].ballType = 'dantuo'
                        item.redDanCathectics.forEach(sunItem=>{
                            arr[index].ballList.push({
                                num:sunItem.cathectic,
                                type:'danRedBall',
                                isGuess:sunItem.isGuess
                            })
                        })
                        arr[index].ballList.push({
                            num:'—',
                            type:'line',
                            isGuess:'0'
                        })
                        item.redTuoCathectics.forEach(sunItem=>{
                            arr[index].ballList.push({
                                num:sunItem.cathectic,
                                type:'tuoRedBall',
                                isGuess:sunItem.isGuess
                            })
                        })
                        if(item.blueDanCathectics.length>0){
                            arr[index].ballList.push({
                                num:'—',
                                type:'line',
                                isGuess:'0'
                            })
                        }
                        item.blueDanCathectics.forEach(sunItem=>{
                            arr[index].ballList.push({
                                num:sunItem.cathectic,
                                type:'danBlueBall',
                                isGuess:sunItem.isGuess
                            })
                        })
                        arr[index].ballList.push({
                            num:'—',
                            type:'line',
                            isGuess:'0'
                        })
                        item.blueTuoCathectics.forEach(sunItem=>{
                            arr[index].ballList.push({
                                num:sunItem.cathectic,
                                type:'tuoBlueBall',
                                isGuess:sunItem.isGuess
                            })
                        })
                    }
                    that.ticketSchemeDetailDTOs = arr
                })
            },
            //继续购买此号
            goOnBuy(){
                this.goOn = true
                var that = this
                //let conformBallList =  JSON.parse(sessionStorage.getItem('conformBallList'))
                let conformBallList = []
                this.ticketSchemeDetailDTOs.forEach((item,index)=>{
                    conformBallList.push({
                        ballType:item.ballType,
                        ballList:item.ballList,
                        msg:{
                            baseMoney:'2',
                            bei:item.cathectic,
                            danFn:item.playType=='0'?'单式':item.playType=='1'?'复式':'',
                            money:item.amount,
                            zhuNum:item.betNum,
                        },
                    })
                })
                sessionStorage.setItem('conformBallList',JSON.stringify(conformBallList))
                sessionStorage.setItem('adds',JSON.stringify(that.adds))
                this.$router.push({
                    path:'/lottery/daletou/touZhuConfirm'
                })
            },
            //跳转到订单详情
            goSelectNum(){
                if(isWebview()){
                    nativeApp({'methodName':'pushUrl','url':'http://caixiaomi.net?cxmxc=scm&type=3&id='+this.orderObj.lotteryClassifyId})
                }else{
                    this.$router.push({
                        path:'/lottery/daletou/selectnumber'
                    })
                }
            },
            color(){
                let channelcolor = "#ea5504"
                if(isWebview()){
                channelcolor = this.channelObj.color
                }
                return channelcolor;
            }
        },
        computed: {
            ...mapState({
                channelObj: state => state.channelObj
            })
        },
        beforeRouteLeave(to, from, next) {
            if(to.path!='/lottery/daletou/touZhuConfirm'){
                next()
            }else{
                if(!this.goOn){
                    this.$router.push({path: '/'})
                }
                next()
            }
        }
    }
</script>