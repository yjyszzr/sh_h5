<template>
    <div class="select-num">
        <!--头部开始-->
        <div class="head">
            <span class="back-img" @click="goBack()"><img src="../../assets/img/ret.png" alt=""></span>
            <div class="head-text" @click="openOrclose()">
                <span>彩小秘·<span v-if="selectedIndex=='0'">标准选号</span><span v-if="selectedIndex=='1'">胆拖选号</span></span>
                <span class="header-down"><img id="downImg" src="../../assets/img/freebuy_img/Collapse@3x.png"
                                               alt=""></span>
            </div>
            <div>
                <span class="memu-btn" @click="popShow = !popShow"><img src="./images/More@3x.png" alt=""></span>
            </div>
        </div>
        <!--躯干-->
        <div class="body">
            <div v-if="myCode=='0'" class="body-main">
                <div class="body-title" @click="popupVisible = !popupVisible">
                    <p>{{data.term_num}}期 截止时间 {{data.endDate}}</p>
                    <p class="history-p">历史开奖 <span class="arrow_right"><img src="../../assets/img/arange.png"
                                                                             alt=""></span></p>
                </div>
                <!--标准选号-->
                <div class="biaozhun" v-if="selectedIndex=='0'">
                    <div class="selection">
                        <div class="phone" @click="machineSelection()">
                            <span class="phone-img-box"><img src="./images/IntelligentChoice@3x.png" alt=""></span>
                            <span>机选</span>
                        </div>
                        <div class="bonus-box">
                            奖池： <span>{{data.prizes}}</span>
                        </div>
                    </div>
                    <div class="ball-box">
                        <ul class="red-ball-ul ball-ul">
                            <li class="ball-li" v-for="(item,index) in preList" :key=index
                                @click="biaozhunSelect(item,'preList')">
                                <span class="ball red-ball" :class="item.selected?'curRedBall':''">{{item.num}}</span>
                                <span class="miss" v-if="historyMiss">{{item.missNum}}</span>
                            </li>
                        </ul>
                        <ul class="blue-ball-ul ball-ul">
                            <li class="ball-li" v-for="(item,index) in postList" :key=index
                                @click="biaozhunSelect(item,'postList')">
                                <span class="ball blue-ball" :class="item.selected?'curBlueBall':''">{{item.num}}</span>
                                <span class="miss" v-if="historyMiss">{{item.missNum}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--胆拖选号-->
                <div class="dantuo" v-if="selectedIndex=='1'">
                    <router-link to="/daletou/whatDantuo"><p class="what-dantuo">什么是胆拖？</p></router-link>
                    <div class="ball-box">
                        <div class="selection dantuo-selection">
                            <p class="desceibe">胆码-红球，至多选4个，至少选1个</p>
                            <div class="bonus-box">
                                奖池： <span>{{data.prizes}}</span>元
                            </div>
                        </div>
                        <ul class="red-ball-ul ball-ul">
                            <li class="ball-li" v-for="(item,index) in danRedPreList" :key=index
                                @click="danTuoSelect(item,index,'redBall','dan')">
                                <span class="ball red-ball" :class="item.selected?'curRedBall':''">{{item.num}}</span>
                                <span class="miss" v-if="historyMiss">{{item.missNum}}</span>
                            </li>
                        </ul>
                        <p class="name-ball red-two">拖码-红球，至少选2个</p>
                        <ul class="red-ball-ul ball-ul">
                            <li class="ball-li" v-for="(item,index) in tuoRedPreList" :key=index
                                @click="danTuoSelect(item,index,'redBall','tuo')">
                                <span class="ball red-ball" :class="item.selected?'curRedBall':''">{{item.num}}</span>
                                <span class="miss" v-if="historyMiss">{{item.missNum}}</span>
                            </li>
                        </ul>
                        <p class="name-ball">胆码-蓝球，至多选1个</p>
                        <ul class="blue-ball-ul ball-ul">
                            <li class="ball-li" v-for="(item,index) in danBluePostList" :key=index
                                @click="danTuoSelect(item,index,'blueBall','dan')">
                                <span class="ball blue-ball" :class="item.selected?'curBlueBall':''">{{item.num}}</span>
                                <span class="miss" v-if="historyMiss">{{item.missNum}}</span>
                            </li>
                        </ul>
                        <p class="name-ball">拖码-蓝球，至少选2个</p>
                        <ul class="blue-ball-ul ball-ul">
                            <li class="ball-li" v-for="(item,index) in tuoBluePostList" :key=index
                                @click="danTuoSelect(item,index,'blueBall','tuo')">
                                <span class="ball blue-ball" :class="item.selected?'curBlueBall':''">{{item.num}}</span>
                                <span class="miss" v-if="historyMiss">{{item.missNum}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="myCode!='0'">
                <!--<p>暂停售卖</p>-->
            </div>
        </div>
        <!--底部-->
        <div class="footer">
            <div class="flet">
                <div class="dele" @click="deleFn()">
                    <i class="iconfont icon-icon-26"></i>
                </div>
                <div class="text">
                    <template v-if="selectedIndex == '0'">
                        <p v-if="textType">请至少选择 <span class="red">5</span>个红球，<span class="blue">2</span>个蓝球</p>
                        <p v-if="!textType">共<span class="red">{{selectZhu.zhuNum}}</span>注，合计<span class="red">{{selectZhu.zhuNum*2}}</span>元
                        </p>
                    </template>
                    <template v-if="selectedIndex =='1'">
                        <p v-if="danTuotextType">请至少选择 <span class="red">6</span>个红球，<span class="blue">2</span>个蓝球</p>
                        <p v-if="!danTuotextType">共<span class="red">{{danTuoZhu.zhuNum}}</span>注，合计<span class="blue">{{danTuoZhu.zhuNum*2}}</span>元
                        </p>
                    </template>
                </div>
            </div>
            <template v-if="selectedIndex=='0'">
                <div class="ok" :class="canOk&&!textType?'okcur':''" @click='goTouZhuConfirm(!textType,canOk)'>
                    确定
                </div>
            </template>
            <template v-if="selectedIndex=='1'">
                <div class="ok" :class="!danTuotextType?'okcur':''" @click='goTouZhuConfirm(!danTuotextType,canOk)'>
                    确定
                </div>
            </template>
            <!--<span><img src="./" alt=""></span>-->
        </div>
        <!--选号方式-->
        <div class="collspce">
            <transition name="mybox">
                <div class="title-collspce" v-if="collapseShow">
                    <p class="btn-box" :class="selectedIndex=='0'?'cur':''" @click="numType('0')">标准选号 <span
                            class="img-box"><img v-show="selectedIndex=='0'" src="./images/Check@3x.png" alt=""></span>
                    </p>
                    <p class="btn-box" :class="selectedIndex=='1'?'cur':''" @click="numType('1')">胆拖选号 <span
                            class="img-box"><img v-show="selectedIndex=='1'" src="./images/Check@3x.png" alt=""></span>
                    </p>
                </div>
            </transition>
            <transition name="ceng">
                <div @touchmove.prevent class="meng-cheng" @click="openOrclose()" v-if="collapseShow"></div>
            </transition>
        </div>
        <!--菜单弹窗-->
        <transition name="fade">
            <div @touchmove.prevent class="pop" @click="popShow = !popShow" v-if="popShow">
                <div class="pop-body">
                    <ul class="memu-ul">
                        <li v-for="(item,index) in memu" @click="goNext(item)" :key="index"><i><img :src="item.imgSrc"
                                                                                                    alt=""></i>{{item.name}}
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
        <!--历史开奖-->
        <div class="history">
            <mt-popup
                    v-model="popupVisible"
                    position="bottom">
                <div class="history-box">
                    <ul class="history-ul">
                        <li class="history-li" v-for="(item,index) in prizeList" :key=index>
                            <span class="history-day">{{item.termNum}}</span>
                            <ul class="sun-ul">
                                <li v-for="(sunItem,sunindex) in item.numList" :key=sunindex>
                                    <span :class="sunindex<5?'redBall':'blueBall'">
                                        {{sunItem}}
                                    </span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </mt-popup>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import "../../assets/css/function.scss";

    .select-num {
        .curRedBall {
            color: #ffffff !important;
            background-color: #eb1c24 !important;
            border: 1px solid #eb1c24 !important;
        }
        .curBlueBall {
            color: #ffffff !important;
            background-color: #0081cc !important;
            border: 1px solid #0081cc !important;
        }
        .cur {
            color: #ea5504 !important;
            border: 1px solid #ea5504 !important;
        }
        .redBall {
            color: #ea5504 !important;
        }
        .blueBall {
            color: #0081cc !important;
        }
        .okcur {
            background-color: #ea5504 !important;
        }
        .head {
            overflow: hidden;
            height: px2rem(100px);
            background: #f4f4f4;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .back-img {
                display: inline-block;
                height: px2rem(30px);
                width: px2rem(30px);
                margin-left: px2rem(30px);
                img {
                    width: 100%;
                }
            }
            .head-text {
                display: flex;
                align-items: center;
                font-size: px2rem(32px);
                color: #505050;
                .header-down {
                    display: inline-block;
                    margin-left: px2rem(10px);
                    height: px2rem(30px);
                    width: px2rem(30px);
                    img {
                        width: 100%;
                    }
                }
            }
            .memu-btn {
                display: inline-block;
                height: px2rem(30px);
                width: px2rem(30px);
                margin-right: px2rem(30px);
                img {
                    width: 100%;
                }
            }

        }
        .popdantuo-box {
            .dantuo-pop {
                width: px2rem(600px);
                margin: 0 auto;
                padding: px2rem(40px) px2rem(30px);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .dantuo-pop-title {
                    line-height: px2rem(60px);
                    font-size: 0.4rem;
                    font-weight: 700;
                }
                .dantuo-pop-body {
                    p {
                        font-size: 0.4rem;
                        color: #666;
                        line-height: px2rem(50px)
                    }
                }
            }
        }

        .tranform180 {
            transform: rotate(180deg)
        }
        .meng-cheng {
            z-index: 1;
            position: absolute;
            top: px2rem(100px);
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, .5);
        }
        /*top:px2rem(100px);*/
        .title-collspce {
            z-index: 2;
            position: absolute;
            width: 100%;
            height: px2rem(100px);
            border-top: 1px solid #c7c7c7;
            display: flex;
            justify-content: center;
            flex-direction: row;
            align-items: center;
            overflow: hidden;
            background: #f4f4f4;
            .btn-box {
                line-height: px2rem(60px);
                width: px2rem(180px);
                text-align: center;
                font-size: px2rem(26px);
                color: #505050;
                border: 1px solid #c7c7c7;
                position: relative;
                margin: 0 px2rem(30px);
                .img-box {
                    display: inline-block;
                    height: px2rem(36px);
                    width: px2rem(36px);
                    position: absolute;
                    bottom: -1px;
                    right: -1px;
                    img {
                        width: 100%;
                    }
                }
            }
        }
        .pop {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.2);
            .pop-body {
                position: absolute;
                /*height: px2rem(200px);*/
                /*width: px2rem(100px);*/
                background-color: #ffffff;
                right: px2rem(20px);
                top: px2rem(100px);
                border-radius: px2rem(10px);
                box-shadow: 0 px2rem(5px) px2rem(20px) #505050;
            }
            .pop-body::before {
                width: 0;
                height: 0;
                border-width: 0 px2rem(20px) px2rem(20px);
                border-style: solid;
                border-color: transparent transparent #ffffff; /*透明 透明  灰*/
                top: px2rem(-19px);
                right: 5px;
                position: absolute;
                content: "";
            }
        }
        .memu-ul {
            width: px2rem(183px);
            li {
                height: px2rem(72px);
                border-bottom: 1px solid #9f9f9f;
                display: flex;
                align-items: center;
                justify-content: left;
                i {
                    height: px2rem(30px);
                    width: px2rem(30px);
                    display: inline-block;
                    margin-right: px2rem(10px);
                    margin-left: px2rem(20px);
                    img {
                        width: 100%;
                    }
                }
            }
            li:last-of-type {
                border: none;
            }
        }
        .history {
            width: 100%;
            .mint-popup {
                width: 100%;
            }
            .history-box {
                height: px2rem(700px);
                overflow: auto;
                .history-ul {
                    padding: 0 px2rem(15px);
                    .history-li {
                        padding-left: 10px;
                        display: flex;
                        flex-direction: row;
                        line-height: px2rem(72px);
                        border-bottom: 1px solid #e8e8e8;
                        font-size: px2rem(28px);
                        .history-day {
                            padding-right: px2rem(50px);
                            color: #787878;
                            font-size: px2rem(26px);
                        }
                        .sun-ul {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            li {
                                padding: 0 px2rem(10px);
                            }
                        }
                    }
                }
            }

        }
        .body {
            position: absolute;
            top: px2rem(100px);
            bottom: px2rem(100px);
            overflow: auto;
              -webkit-overflow-scrolling: touch !important;
            box-sizing: border-box;
            width: 100%;
            height: auto;
            /*background-color: #ffffff;*/
            .body-main {
                padding: 0 px2rem(8px);
                background-color: white;
                margin-bottom: px2rem(10px);
            }
            .body-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: px2rem(80px);
                color: #9f9f9f;
                font-size: px2rem(26px);
                border-bottom: 1px solid #f0f0f0;
                padding: 0 px2rem(15px);
            }
            .dantuo {
                .dantuo-selection {
                    height: px2rem(70px);
                }
                .what-dantuo {
                    margin-left: px2rem(22px);
                    margin-top: px2rem(30px);
                    color: #F5911e;
                }
                .desceibe {
                    color: #787878;
                }
                .name-ball {
                    margin-left: px2rem(20px);
                    color: #787878;
                    margin-top: px2rem(20px);
                }
                .red-ball-ul {
                    border-bottom: 0 none !important;
                }
            }
            .selection {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                height: px2rem(100px);
                padding: 0 px2rem(20px);
                .phone {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: px2rem(60px);
                    width: px2rem(148px);
                    background: rgba(245, 145, 30, .2);
                    border-radius: px2rem(20px);
                    font-size: px2rem(26px);
                    color: #f5911e;
                    .phone-img-box {
                        padding-right: px2rem(10px);
                        display: inline-block;
                        height: px2rem(36px);
                        width: px2rem(36px);
                        overflow: hidden;
                        img {
                            width: 100%;
                        }
                    }
                }
                .bonus-box {
                    font-size: px2rem(26px);
                    color: #787878;
                    span {
                        color: #ea5504;
                    }
                }
            }
            .ball-box {
                margin-top: px2rem(20px);
                .red-two {
                    margin-bottom: px2rem(20px);
                }
                .red-ball-ul {
                    border-bottom: 1px solid #f0f0f0;
                    .red-ball {
                        color: #eb1c24;
                    }
                }
                .blue-ball-ul {
                    margin-top: px2rem(20px);
                    .blue-ball {
                        color: #0081cc;
                    }
                }
                .ball-ul {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    flex-wrap: wrap;
                    padding-bottom: 10px;
                    .ball-li {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        padding: 0 px2rem(14px);
                    }
                    .ball {
                        display: inline-block;
                        line-height: px2rem(72px);
                        width: px2rem(72px);
                        border-radius: 100%;
                        border: 1px solid #c7c7c7;
                        text-align: center;
                        font-size: px2rem(30px);
                        margin: px2rem(12px) 0;

                    }
                    .miss {
                        color: #c7c7c7;
                        font-size: px2rem(22px);
                    }

                }
            }
        }
        .footer {
            border-top: 1px solid #f0f0f0;
            box-sizing: border-box;
            width: 100%;
            background-color: #ffffff;
            position: absolute;
            bottom: 0;
            display: flex;
            height: px2rem(100px);
            justify-content: space-between;
            align-items: center;
            .flet {
                display: flex;
                align-items: center;
            }
            .dele {
                width: px2rem(100px);
                border-right: 1px solid #f0f0f0;
                text-align: center;
                line-height: px2rem(70px);
                color: #505050;
                i {
                    font-size: px2rem(40px);
                }
            }
            .text {
                margin-left: px2rem(20px);
                color: #787878;
                p {
                    font-size: px2rem(26px);
                }
                .red {
                    color: #EA5504;
                }
                .blue {
                    color: #0081cc;
                }
            }
            .ok {
                width: px2rem(250px);
                text-align: center;
                line-height: px2rem(100px);
                color: #ffffff;
                font-size: px2rem(28px);
                background-color: #c7c7c7;
            }
        }
        .history-p {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .arrow_right {
            margin-left: px2rem(10px);
            height: px2rem(28px);
            width: px2rem(15px);
            img {
                width: 100%;
            }
        }
    }
</style>
<script>
    import {getCombinationCount, getArrayItems, danTuoCount} from '../../util/common'
    import {MessageBox, Popup, Indicator, Toast} from 'mint-ui';
    import api from '../../fetch/api'
    import GameDescription from "./images/GameDescription@3x.png"
    import LotteryResult from "./images/LotteryResult@3x.png"
    import Trend from "./images/Trend@3x.png"
    import Missing from "./images/Missing@3x.png"

    export default {
        name: "select-number",
        data() {
            return {
                popShow: false, //菜单列表弹窗
                collapseShow: false, //折叠选号方式
                popupVisible: false,//历史开奖列表
                //popdantuo: false,//胆拖介绍
                historyMiss: false,//显示历史遗漏
                selectedIndex: JSON.parse(sessionStorage.getItem('selectedIndex')) ? JSON.parse(sessionStorage.getItem('selectedIndex')) : '0',//'0'标准选号 '1'胆拖选号
                preList: [],//前区遗漏
                postList: [],//后区遗漏 ,
                danRedPreList: [],//胆前区遗漏
                tuoRedPreList: [],//拖前区遗漏
                danBluePostList: [],//胆后区遗漏 ,
                tuoBluePostList: [],//拖后区遗漏 ,
                prizeList: [],//历史中奖，
                lottoMes: {
                    redBallList: [],//标准选号选中红球集合
                    blueBallList: [],//标准选号选中篮球集合,
                    danRedMaList: [],//胆码选号红球集合
                    tuoRedMaList: [],//托码选号红求集合
                    danBlueMaList: [],//胆码选号蓝球集合
                    tuoBlueMaList: [],//托码选号蓝求集合
                },
                redBallBox: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'],
                blueBallBox: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                textType: true, //标准选号提示文字
                danTuotextType: true, //胆拖选号提示文字
                canOk: true, //是否能点击确定
                selectZhu: {
                    zhuNum: '',//标注选号注数
                    zhuHe: []  //标准选号组合
                },
                danTuoZhu: {
                    zhuNum: '', //胆拖选号注数
                    zhuHe: []  // 标准选号组合
                },
                myCode:'0',
                data: {},
                memu: [
                    {
                        name: '走势图',
                        imgSrc: Trend
                    },
                    {
                        name: '玩法帮助',
                        imgSrc: GameDescription
                    },
                    {
                        name: '开奖结果',
                        imgSrc: LotteryResult
                    },
                    {
                        name: '显示遗漏',
                        imgSrc: Missing
                    }
                ]
            }
        },
        beforeCreate() {
            Indicator.open()
        },
        created() {

            this.getTicketInfoFn()
            this.yaoyiyao()
        },
        methods: {
            // 头部返回
            goBack() {
                this.$router.go(-1);
            },
            //通过路由来回填选中号码集合
            setSelectByrouter() {
                var that = this
                let ballList = this.$route.query.ballList
                if (ballList != undefined) {
                    if (sessionStorage.getItem('selectedIndex') == '0') {
                        ballList.forEach(item => {
                            if (item.type == 'redBall') {
                                that.lottoMes.redBallList.push(item.num)
                            }
                            if (item.type == 'blueBall') {
                                that.lottoMes.blueBallList.push(item.num)
                            }
                        })
                        this.setSelectBallFn('biaoZhun')
                    }
                    if (sessionStorage.getItem('selectedIndex') == '1') {
                        ballList.forEach(item => {
                            if (item.type == 'danRedBall') {
                                that.lottoMes.danRedMaList.push(item.num)
                            }
                            if (item.type == 'tuoRedBall') {
                                that.lottoMes.tuoRedMaList.push(item.num)
                            }
                            if (item.type == 'danBlueBall') {
                                that.lottoMes.danBlueMaList.push(item.num)
                            }
                            if (item.type == 'tuoBlueBall') {
                                that.lottoMes.tuoBlueMaList.push(item.num)
                            }
                        })
                        this.setSelectBallFn('dantuo')
                    }
                }
            },
            //回显选中球号
            setSelectBallFn(type) {
                if (type == 'biaoZhun') {
                    var that = this
                    this.preList.forEach(item => {
                        that.lottoMes.redBallList.forEach(sunItem => {
                            if (item.num == sunItem) {
                                item.selected = true
                            }
                        })
                    })
                    this.postList.forEach(item => {
                        this.lottoMes.blueBallList.forEach(sunItem => {
                            if (item.num == sunItem) {
                                item.selected = true
                            }
                        })
                    })

                } else if (type == 'dantuo') {
                    this.danRedPreList.forEach(item => {
                        this.lottoMes.danRedMaList.forEach(sunItem => {
                            if (item.num == sunItem) {
                                item.selected = true
                            }
                        })
                    })
                    this.tuoRedPreList.forEach(item => {
                        this.lottoMes.tuoRedMaList.forEach(sunItem => {
                            if (item.num == sunItem) {
                                item.selected = true
                            }
                        })
                    })
                    this.danBluePostList.forEach(item => {
                        this.lottoMes.danBlueMaList.forEach(sunItem => {
                            if (item.num == sunItem) {
                                item.selected = true
                            }
                        })
                    })
                    this.tuoBluePostList.forEach(item => {
                        this.lottoMes.tuoBlueMaList.forEach(sunItem => {
                            if (item.num == sunItem) {
                                item.selected = true
                            }
                        })
                    })
                }
                this.viewText()
            },
            //获取详情
            getTicketInfoFn() {
                api.getTicketInfo('')
                    .then(res => {
                        this.myCode = res.code
                        if (res.code == 0) {
                            Indicator.close()
                            this.data = res.data
                            this.prizeList = res.data.prizeList
                            res.data.postList.forEach((item, index) => {
                                this.postList.push(
                                    {
                                        num: (index + 1) < 10 ? '0' + (index + 1) : (index + 1).toString(),
                                        missNum: item,
                                        selected: false
                                    }
                                )
                                this.danBluePostList.push(
                                    {
                                        num: (index + 1) < 10 ? '0' + (index + 1) : (index + 1).toString(),
                                        missNum: item,
                                        selected: false
                                    }
                                )
                                this.tuoBluePostList.push(
                                    {
                                        num: (index + 1) < 10 ? '0' + (index + 1) : (index + 1).toString(),
                                        missNum: item,
                                        selected: false
                                    }
                                )
                            })
                            res.data.preList.forEach((item, index) => {
                                this.preList.push(
                                    {
                                        num: (index + 1) < 10 ? '0' + (index + 1) : (index + 1).toString(),
                                        missNum: item,
                                        selected: false
                                    }
                                )
                                this.danRedPreList.push(
                                    {
                                        num: (index + 1) < 10 ? '0' + (index + 1) : (index + 1).toString(),
                                        missNum: item,
                                        selected: false
                                    }
                                )
                                this.tuoRedPreList.push(
                                    {
                                        num: (index + 1) < 10 ? '0' + (index + 1) : (index + 1).toString(),
                                        missNum: item,
                                        selected: false
                                    }
                                )

                            })
                        }

                        this.lottoMes.redBallList = [],//标准选号选中红球集合
                        this.lottoMes.blueBallList = []//标准选号选中篮球集合,
                        this.lottoMes.danRedMaList = []//胆码选号红球集合
                        this.lottoMes.tuoRedMaList = []//托码选号红求集合
                        this.lottoMes.danBlueMaList = []//胆码选号蓝球集合
                        this.lottoMes.tuoBlueMaList = []//托码选号蓝求集合
                        // this.getLocalStorageFn('biaoZhun')
                        //this.getLocalStorageFn('dantuo')
                        this.setSelectByrouter()
                    })
            },
            //标准选号
            biaozhunSelect(item, type) {
                if (type == 'preList') { //点击前区
                    if (this.lottoMes.redBallList.length < 18 && this.canOk) {
                        this.$set(item, 'selected', !item.selected)
                        if (item.selected) {
                            this.lottoMes.redBallList.push(item.num);
                        } else {
                            var index = this.lottoMes.redBallList.indexOf(item.num);
                            if (index > -1) {
                                this.lottoMes.redBallList.splice(index, 1);
                            }
                        }
                    } else {
                        this.$set(item, 'selected', false)
                        var index = this.lottoMes.redBallList.indexOf(item.num);
                        if (index > -1) {
                            this.lottoMes.redBallList.splice(index, 1);
                        }
                        if (this.lottoMes.redBallList.length >= 18) {
                            Toast('最多只能选择18个红球')
                        }
                    }
                    this.viewText('preList', item)
                }
                if (type == 'postList') { //点后区
                    this.$set(item, 'selected', !item.selected)
                    if (item.selected) {
                        this.lottoMes.blueBallList.push(item.num)
                    } else {
                        var index = this.lottoMes.blueBallList.indexOf(item.num);
                        if (index > -1) {
                            this.lottoMes.blueBallList.splice(index, 1);
                        }
                    }
                    this.viewText('postList', item)
                }
                // this.setLocalStorageFn('biaoZhun')
            },
            //判断投注金额是否超20000
            moreTwoWan(ballType, item) {
                var that = this
                if (parseInt(this.selectZhu.zhuNum) * 2 > 20000) {
                    Toast('单次投注最多2万元')
                    setTimeout(function () {
                        that.$set(item, 'selected', !item.selected)
                        if (ballType == 'preList') {
                            that.lottoMes.redBallList.pop()
                            sessionStorage.setItem('lottoMes', JSON.stringify(that.lottoMes.redBallList))
                        }
                        if (ballType == 'postList') {
                            that.lottoMes.blueBallList.pop()
                            sessionStorage.setItem('lottoMes', JSON.stringify(that.lottoMes.blueBallList))
                        }
                        that.viewText()
                    }, 500)
                }
            },
            //提示信息
            viewText(ballType, item) {
                if (this.selectedIndex == '0') {
                    if (this.lottoMes.redBallList.length > 4 && this.lottoMes.blueBallList.length > 1) {
                        this.textType = false
                        this.selectZhu.zhuNum = getCombinationCount(this.lottoMes.redBallList.length, 5) * getCombinationCount(this.lottoMes.blueBallList.length, 2)
                        this.moreTwoWan(ballType, item)
                    } else {
                        this.textType = true
                    }
                }
                if (this.selectedIndex == '1') {
                    if (this.lottoMes.danRedMaList.length > 0 && this.lottoMes.tuoRedMaList.length > 1 && this.lottoMes.tuoBlueMaList.length > 1 && (this.lottoMes.danRedMaList.length + this.lottoMes.tuoRedMaList.length) > 5 && (this.lottoMes.danBlueMaList.length + this.lottoMes.tuoBlueMaList.length) > 1) {
                        this.danTuotextType = false
                        this.danTuoZhu.zhuNum = danTuoCount(this.lottoMes.danRedMaList.length, this.lottoMes.tuoRedMaList.length, this.lottoMes.danBlueMaList.length, this.lottoMes.tuoBlueMaList.length)
                    } else {
                        this.danTuotextType = true
                    }
                }
            },
            //摇一摇选号
            yaoyiyao() {
                var that = this
                //运动事件监听
                if (window.DeviceMotionEvent) {
                    window.addEventListener('devicemotion', deviceMotionHandler, false);
                }
                //获取加速度信息
                //通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
                //而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
                var SHAKE_THRESHOLD = 18000;
                var last_update = 0;
                var x, y, z, last_x = 0, last_y = 0, last_z = 0;

                function deviceMotionHandler(eventData) {
                    var acceleration = eventData.accelerationIncludingGravity;
                    var curTime = new Date().getTime();
                    if ((curTime - last_update) > 10) {
                        var diffTime = curTime - last_update;
                        last_update = curTime;
                        x = acceleration.x;
                        y = acceleration.y;
                        z = acceleration.z;
                        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
                        if (speed > SHAKE_THRESHOLD && this.code == '0') {
                            that.machineSelection()
                        }
                        last_x = x;
                        last_y = y;
                        last_z = z;
                    }
                }
            },
            //机选
            machineSelection() {
                var that = this
                this.preList.forEach(sunItem => {
                    sunItem.selected = false
                })
                this.postList.forEach(sunItem => {
                    sunItem.selected = false
                })
                this.lottoMes.redBallList = []
                this.lottoMes.blueBallList = []
                this.lottoMes.redBallList = this.lottoMes.redBallList.concat(getArrayItems(this.redBallBox, 5))
                this.lottoMes.blueBallList = this.lottoMes.blueBallList.concat(getArrayItems(this.blueBallBox, 2))
                this.setSelectBallFn('biaoZhun')
                // this.setLocalStorageFn('biaoZhun')
            },
            //胆拖选号
            danTuoSelect(item, index, ballType, type) {
                if (ballType == 'redBall') {
                    if (type == 'dan') {
                        let danRedIndex = this.lottoMes.danRedMaList.indexOf(item.num)
                        if (danRedIndex > -1) {
                            this.$set(item, 'selected', !item.selected)
                            this.lottoMes.danRedMaList.splice(danRedIndex, 1);
                        } else if (this.lottoMes.danRedMaList.length < 4) {
                            this.$set(item, 'selected', !item.selected)
                            this.lottoMes.danRedMaList.push(item.num);
                            this.tuoRedPreList[index].selected = false
                            let tuoIndex = this.lottoMes.tuoRedMaList.indexOf(item.num)
                            if (tuoIndex != -1) {
                                this.lottoMes.tuoRedMaList.splice(tuoIndex, 1);
                            }
                        }
                    }
                    if (type == 'tuo') {
                        let tuoRedIndex = this.lottoMes.tuoRedMaList.indexOf(item.num)
                        if (tuoRedIndex > -1) {
                            this.$set(item, 'selected', !item.selected)
                            this.lottoMes.tuoRedMaList.splice(tuoRedIndex, 1);
                        } else {
                            this.$set(item, 'selected', !item.selected)
                            this.lottoMes.tuoRedMaList.push(item.num);
                            this.danRedPreList[index].selected = false
                            let danindex = this.lottoMes.danRedMaList.indexOf(item.num)
                            if (danindex != -1) {
                                this.lottoMes.danRedMaList.splice(danindex, 1);
                            }
                        }
                    }
                }
                if (ballType == 'blueBall') {
                    if (type == 'dan') {
                        let danBlueIndex = this.lottoMes.danBlueMaList.indexOf(item.num)
                        if (danBlueIndex > -1) {
                            this.$set(item, 'selected', !item.selected)
                            this.lottoMes.danBlueMaList.splice(danBlueIndex, 1);
                        } else {
                            var that = this
                            this.danBluePostList.forEach(items=>{
                                that.$set(items, 'selected', false)
                            })
                            this.$set(item, 'selected', !item.selected)
                            this.lottoMes.danBlueMaList=new Array(item.num);
                            let tuoIndex = this.lottoMes.tuoBlueMaList.indexOf(item.num)
                            if (tuoIndex != -1) {
                                this.tuoBluePostList[index].selected = false
                                this.lottoMes.tuoBlueMaList.splice(tuoIndex, 1);
                            }
                        }
                    }
                    if (type == 'tuo') {
                        let tuoBlueIndex = this.lottoMes.tuoBlueMaList.indexOf(item.num)
                        if (tuoBlueIndex > -1) {
                            this.$set(item, 'selected', !item.selected)
                            this.lottoMes.tuoBlueMaList.splice(tuoBlueIndex, 1)
                        } else {
                            this.$set(item, 'selected', !item.selected)
                            this.lottoMes.tuoBlueMaList.push(item.num);
                            this.danBluePostList[index].selected = false
                            let danIndex = this.lottoMes.danBlueMaList.indexOf(item.num)
                            if (danIndex != -1) {
                                this.lottoMes.danBlueMaList.splice(danIndex, 1);
                            }
                        }
                    }
                }
                this.viewText()
                // this.setLocalStorageFn('dantuo')
            },
            //存储 所选号码
            setLocalStorageFn(type) {
                sessionStorage.setItem('lottoMes', JSON.stringify(this.lottoMes))
            },
            //内存中取出所选号码
            getLocalStorageFn() {
                if (JSON.parse(sessionStorage.getItem('lottoMes')) != null) {
                    this.lottoMes = JSON.parse(sessionStorage.getItem('lottoMes'))
                }
                this.viewText()
            },
            //删除所选号
            deleFn() {
                if (this.selectedIndex == '0') {
                    if (this.lottoMes.redBallList.length > 0 || this.lottoMes.blueBallList.length > 0) {
                        MessageBox.confirm('确定清空所选号码吗?', '温馨提示').then(action => {
                            if (this.lottoMes.redBallList.length > 0) {
                                this.preList.forEach(sunItem => {
                                    sunItem.selected = false
                                })
                            }
                            if (this.lottoMes.blueBallList.length > 0) {
                                this.postList.forEach(sunItem => {
                                    sunItem.selected = false
                                })
                            }
                            this.lottoMes.redBallList = []
                            this.lottoMes.blueBallList = []
                            // this.setLocalStorageFn('biaoZhun')
                            this.viewText()
                        }).catch(function () {

                        });
                    }
                }
                if (this.selectedIndex == '1') {
                    if (this.lottoMes.danRedMaList.length > 0 || this.lottoMes.tuoRedMaList.length > 0 || this.lottoMes.danBlueMaList.length > 0 || this.lottoMes.tuoBlueMaList.length > 0) {
                        MessageBox.confirm('确定清空所选号码吗?', '温馨提示').then(action => {
                            if (this.lottoMes.danRedMaList.length > 0) {
                                this.danRedPreList.forEach(sunItem => {
                                    sunItem.selected = false
                                })
                            }
                            if (this.lottoMes.tuoRedMaList.length > 0) {
                                this.tuoRedPreList.forEach(sunItem => {
                                    sunItem.selected = false
                                })
                            }
                            if (this.lottoMes.danBlueMaList.length > 0) {
                                this.danBluePostList.forEach(sunItem => {
                                    sunItem.selected = false
                                })
                            }
                            if (this.lottoMes.tuoBlueMaList.length > 0) {
                                this.tuoBluePostList.forEach(sunItem => {
                                    sunItem.selected = false
                                })
                            }
                            this.lottoMes.danRedMaList = [],//胆码选号红球集合
                                this.lottoMes.tuoRedMaList = [],//托码选号红求集合
                                this.lottoMes.danBlueMaList = [],//胆码选号蓝球集合
                                this.lottoMes.tuoBlueMaList = [],//托码选号蓝求集合
                                // this.setLocalStorageFn('dantuo')
                            this.viewText()
                        }).catch(function () {

                        });
                    }
                }

            },
            //大乐透选号头部是否展开
            openOrclose() {
                if ($('#downImg').hasClass('tranform180')) {
                    $('#downImg').removeClass('tranform180')
                } else {
                    $('#downImg').addClass('tranform180')
                }
                this.collapseShow = !this.collapseShow
            },
            //投注方式选择
            numType(index) {
                var that = this
                sessionStorage.setItem('selectedIndex', index)
                this.selectedIndex = index
                // if (index == '1') {
                //     this.getLocalStorageFn('dantuo')
                // }
                // if (index == '0') {
                //     this.getLocalStorageFn('biaozhun')
                // }
                that.openOrclose()
            },
            goNext(item) {
                if (item.name == '隐藏遗漏' || item.name == '显示遗漏') {
                    this.historyMiss = !this.historyMiss
                    if (item.name == '隐藏遗漏') {
                        this.memu[3].name = '显示遗漏'
                    } else {
                        this.memu[3].name = '隐藏遗漏'
                    }
                }
                else if (item.name == '玩法帮助') {
                    this.$router.push({
                        path: '/daletou/playHelp'
                    })
                }
                else if (item.name == '走势图') {
                    this.$router.push({
                        path: '/lottery/daletou/runchart'
                    })
                } else if (item.name == '开奖结果') {
                    // this.$router.push({
                    //     path: '/daletou/programmeDetails'
                    // })
                    Toast('暂未开放此功能')
                }
            },
            // 投注确认
            goTouZhuConfirm(key, key2) {
                if ((this.danTuoZhu.zhuNum * 2) > 20000 && this.selectedIndex == '1') {
                    Toast("投注金额不得超过2万元！")
                    return
                }
                if (key && key2) {
                    sessionStorage.setItem('selectedIndex', this.selectedIndex)
                    this.dataProcess()
                    this.$router.push({
                        path: '/lottery/daletou/touZhuConfirm'
                    })
                }
            },
            // 去投注数据处理
            dataProcess() {
                //清空暂存球列表
                var ballList = []
                if (sessionStorage.getItem('conformBallList') != null) {
                    var conformBallList = JSON.parse(sessionStorage.getItem('conformBallList'))
                    if(sessionStorage.getItem('adds')){
                        let itemIndex = JSON.parse(sessionStorage.getItem('adds')).itemEditIndex
                        if (itemIndex != -1 && conformBallList[itemIndex] != undefined) {
                            if (conformBallList[itemIndex].msg.status == 'edit') {
                                conformBallList.splice(itemIndex, 1)
                            }
                        }
                    }
                } else {
                    var conformBallList = []
                }
                // 将数据整理
                if (this.selectedIndex == '0') {
                    this.lottoMes.redBallList.forEach(item => {
                        ballList.push({
                            num: item,
                            type: 'redBall'
                        })
                    })
                    this.lottoMes.blueBallList.forEach(item => {
                        ballList.push({
                            num: item,
                            type: 'blueBall'
                        })
                    })
                    conformBallList.push({
                        ballList: ballList,
                        ballType: 'biaozhun',
                        msg: {
                            zhuNum: this.selectZhu.zhuNum,
                            danFn: ballList.length > 7 ? '复式' : '单式',
                            bei: JSON.parse(sessionStorage.getItem('adds')) != null ? JSON.parse(sessionStorage.getItem('adds')).bei : 1,
                            money: this.selectZhu.zhuNum * 2,
                            baseMoney: 2,
                        }
                    })
                }
                if (this.selectedIndex == '1') {
                    for (let i = 0; i < this.lottoMes.danRedMaList.length + 1; i++) {
                        if (i < this.lottoMes.danRedMaList.length) {
                            ballList.push({
                                num: this.lottoMes.danRedMaList[i],
                                type: 'danRedBall'
                            })
                        } else {
                            ballList.push({
                                num: '—',
                                type: 'line'
                            })
                        }
                    }
                    for (let i = 0; i < this.lottoMes.tuoRedMaList.length + 1; i++) {
                        if (i < this.lottoMes.tuoRedMaList.length) {
                            ballList.push({
                                num: this.lottoMes.tuoRedMaList[i],
                                type: 'tuoRedBall'
                            })
                        } else {
                            ballList.push({
                                num: '—',
                                type: 'line'
                            })
                        }
                    }
                    for (let i = 0; i < this.lottoMes.danBlueMaList.length + 1; i++) {
                        if (i < this.lottoMes.danBlueMaList.length) {
                            ballList.push({
                                num: this.lottoMes.danBlueMaList[i],
                                type: 'danBlueBall'
                            })
                        } else if (this.lottoMes.danBlueMaList.length != 0) {
                            ballList.push({
                                num: '—',
                                type: 'line'
                            })
                        }
                    }
                    for (let i = 0; i < this.lottoMes.tuoBlueMaList.length + 1; i++) {
                        if (i < this.lottoMes.tuoBlueMaList.length) {
                            ballList.push({
                                num: this.lottoMes.tuoBlueMaList[i],
                                type: 'tuoBlueBall'
                            })
                        }
                    }
                    conformBallList.push({
                        ballList: ballList,
                        ballType: 'dantuo',
                        msg: {
                            zhuNum: this.danTuoZhu.zhuNum,
                            danFn: '胆拖',
                            bei: JSON.parse(sessionStorage.getItem('adds')) != null ? JSON.parse(sessionStorage.getItem('adds')).bei : 1,
                            money: this.danTuoZhu.zhuNum * 2,
                            baseMoney: 2,
                        }
                    })
                }
                sessionStorage.setItem('conformBallList', JSON.stringify(conformBallList))
            },
        },
        beforeRouteEnter(to, from, next){
            if(from.name=='index'||from.path=='/daletou/programmeDetails'){
                sessionStorage.setItem('conformBallList',JSON.stringify([]))
            }
            next()
        },
        beforeRouteLeave(to, from, next) {
            if (to.path == '/lottery/daletou/touZhuConfirm') {
                if (!sessionStorage.getItem('conformBallList') || JSON.parse(sessionStorage.getItem('conformBallList')).length <= 0) {
                    next({
                        path: '/'
                    })
                } else {
                    next()
                }
            } else {
                next()
            }
        }
    }
</script>

