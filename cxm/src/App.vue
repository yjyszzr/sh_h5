<template>
    <!--2018.7.18-->
    <div id="app">
        <v-headertop :title='title()' :showTitle='showTitle()' :menu-display="menuDisplay()"
                     v-show='isShowHeader'></v-headertop>
        <mainSkeleton v-show="!consultinit"></mainSkeleton>
        <transition name="fade">
            <v-shortcut v-if="this.$store.state.mark_shortcut"></v-shortcut>
        </transition>
        <transition name="fade">
            <div id='content' class="content" v-show='consultinit'>
                <!-- <transition  mode="out-in" enter-active-class='bounce-enter' leave-active-class="bounce-leave">
                    <router-view></router-view>
                </transition>   -->
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </div>
        </transition>
        <v-footer v-show='showBar()'></v-footer>
        <transition name="fade">
            <v-mark v-if="this.$store.state.mark_show"></v-mark>
        </transition>
        <v-pmark v-show="this.$store.state.mark_playObj.mark_playBox"></v-pmark>
    </div>
</template>

<script>
    import HeaderTop from "./components/public/header/Header";
    import footer from "./components/public/footer/footer";
    import mark from "./components/public/mark/mark";
    import pmark from "./components/public/mark/match_playut/mark_playut";
    import {ScrollFix} from './util/common'
    import {wxPd,channel} from './util/common'
    import {getUrlStr,isWebview,nativeApp} from './util/common'
    import mainSkeleton from './components/public/mainSkeleton/main.skeleton.vue'
    import shortcut from './components/index/shortcut.vue'
    import { Toast } from 'mint-ui'
    // import LocalScrollFix from 'Localscrollfix'
    export default {
        name: "App",
        components: {
            "v-headertop": HeaderTop,
            "v-footer": footer,
            "v-mark": mark,
            "v-pmark": pmark,
            "v-shortcut": shortcut,
            mainSkeleton
        },
        data() {
            return {
                isShowHeader: false,
            };
        },
        created() {

        },
        methods: {
            title() {
                if (this.$route.path.split("/")[2]) {
                    if ((this.$route.path.split("/")[3] && this.$route.path.split("/")[3] != 'worldwinner' && this.$route.path.split("/")[3] != 'fsplace')||this.$route.path.split("/")[2]=='wheel') {
                        this.isShowHeader = false;
                    } else {
                        this.isShowHeader = true;
                    }
                    switch (this.$route.path.split("/")[2]) {
                        case "register":
                            return "注册";
                        case "pwd":
                            return "密码登录";
                        case "sms":
                            return "短信登录";
                        case "find":
                            return "找回密码";
                        case "down":
                            return "APP下载";
                        case "revise":
                            return "修改密码";
                        case "about":
                            return "关于我们";
                        case "detail":
                            return "优惠券";
                        case "certification":
                            return "实名认证";
                        case "insurance":
                            return "安全保障";
                        case "suggestion":
                            return "投诉建议";
                        case "recharge":
                            return "充值";
                        case "withdraw":
                            return "提现";
                        case "record":
                            return "投注记录";
                        case "add_card":
                            return "添加银行卡";
                        case "credit_card":
                            return "管理银行卡";
                        case "account":
                            return "账户明细";
                        case "message":
                            return "消息中心";
                        case "order":
                            return "订单详情";
                        case "draw":
                            return "出票方案";
                        case "payment":
                            return "支付订单";
                        case "ewmPay":
                            return "二维码支付";
                        case "cathectic":
                            return "投注确认";
                        case "teamDetail":
                            return "查看详情";
                        case "consult":
                            return "资讯详情";
                        case "collection":
                            return "我的收藏";
                        case "moreInfo":
                            return "更多资讯";
                        case 'help':
                            return "帮助中心";
                        case 'service':
                            return "注册服务协议";
                        case 'inToplay':
                            return "玩法帮助";
                        case 'protocol':
                            return "投注服务协议";
                        case 'activity':
                            return "活动详情";
                        case 'give_details':
                            return "提现详情";
                        case 'quickinfo':
                            return "快捷支付";
//          一期活动
                        case 'tuiguang':
                            return "推广中心";
                        case 'rule':
                            return "活动规则";
                        case 'mycode':
                            return "我的二维码";
                        case 'income':
                            return "我的推广收入";
                        case 'incomedetail':
                            return "收入明细";
                        case 'include':
                            return "如何计算收益";
                        //二期活动
                        case 'red_packet':
                            return "充值送壕礼";
                        case 'oldwithnew':
                            return "小白课堂";
                        case 'jingcai':
                            return "竞猜";
                        case 'recorded':
                            return "竞猜纪录";
                        case 'recordedList':
                            return "竞猜记录";
                        case 'upRecord':
                            return "中奖记录";
                        case 'one':
                            return "注册送红包";
                        //老带新
                        case 'oldbeltyd':
                            return "邀请好友得红包";
                        case 'oldbeltnew':
                            return "邀请好友得红包";
                        //大转盘
                        case 'wheel':
                            return "幸运大转盘";
                        case 'explain':
                            return "胆说明";
                        case 'success':
                            return "注册推广员";
                        case 'world_explain':
                            return "投注服务协议";
                        case 'setup':
                            return "个人信息";
                        case 'setlogin':
                            return "设置登录密码";
                        case 'setchange':
                            return "修改登录密码";
                        case 'joinWeChat':
                            return "彩民交流群";
                        case 'rechangeActivity':
                            return "充值送红包";
                            //大乐透
                        case 'playHelp':
                            return '玩法帮助';
                        case 'ticketScheme':
                            return '出票方案';
                        case 'whatDantuo':
                            return '胆拖介绍';
                        case 'programmeDetails':
                            return '方案详情';
                        case 'touZhuConfirm':
                            return '投注确认';
                    }
                } else {
                    if (
                        this.$route.path.split("/")[1] == "user" ||
                        this.$route.path.split("/")[1] == "lotteryResult" ||
                        this.$route.path.split("/")[1] == "find"
                    ) {
                        this.isShowHeader = true;
                    } else {
                        this.isShowHeader = false;
                    }
                    switch (this.$route.path.split("/")[1]) {
                        case "user":
                            return "我的";
                        case "lotteryResult":
                            return "比赛";
                        case "find":
                            return "发现";
                    }
                }
            },
            menuDisplay() {
                if (
                    this.$route.path.split("/")[2] == "singleNote" ||
                    this.$route.path.split("/")[2] == "collection" ||
                    this.$route.path.split("/")[2] == "consult" ||
                    this.$route.path.split("/")[2] == "tuiguang" ||
                    this.$route.path.split("/")[2] == "incomedetail" ||
                    this.$route.path.split("/")[2] == "discount" ||
                    this.$route.path.split("/")[2] == "world_matchList" ||
                    this.$route.path.split("/")[2] == "cathectic" ||
                    this.$route.path.split("/")[2] == "account" ||
                    this.$route.path.split("/")[1] == "user" ||
                    this.$route.path.split("/")[1] == "lotteryResult"||
                    this.$route.path.split("/")[2] == "selectNumber"
                ) {
                    return true;
                } else {
                    return false;
                }
            },
            showTitle() {
                // if ((window.location.href.split("?")[1]&&getUrlStr('showtitle',location.href)=='1')||wxPd()) {
                //    return false;
                // } else {
                //    return true;
                // }
                if (isWebview()||this.$route.name=='404'||this.$route.query.showtitle==1) {
                    return false;
                } else {
                    return true;
                }
            },
            showBar() {
                if (getUrlStr('showBar', location.href) == '1') {
                    return false;
                } else {
                    return true;
                }
            }
        },
        mounted() {
            if(getUrlStr('qd',location.href)){
                this.$store.commit('CHANNELOBJ',channel(getUrlStr('qd',location.href)))
            }
            document.title = this.channelObj.channelNmae
            window.getChannel = (str)=> {
                this.$store.commit('CHANNELOBJ',channel(str))
            }
            nativeApp({'methodName':'channel'})
        },
        computed: {
            consultinit() {
                return this.$store.state.skeletion.consultInit;
            },
            channelObj(){
                return this.$store.state.channelObj;
            }
        },
    };
</script>

<style lang='scss'>
    @import "./assets/css/public.scss";
    @import "./assets/css/function.scss";

    .mint-actionsheet-listitem, .mint-actionsheet-button {
        font-size: px2rem(26px) !important;
    }

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100%;
        background: #f5f5f5;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: center;
        .content {
            width: 100%;
            overflow: scroll;
            -webkit-overflow-scrolling: touch !important;
            position: relative;
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            height: 100%;
        }
        .bounce-enter {
            animation: bounce-in 0.3s;
        }
        .bounce-leave {
            animation: bounce-out 0.3s;
        }
        .fade-enter-active,
        .fade-leave-active {
            transition: opacity 0.3s;
        }
        .fade-enter,
        .fade-leave-active {
            opacity: 0;
        }
    }

    @keyframes bounce-in {
        0% {
            opacity: 0;
            -webkit-transform: translateX(100%);
        }
        100% {
            opacity: 1;
            -webkit-transform: translateX(0);
        }
    }

    @keyframes bounce-out {
        0% {
            opacity: 0;
            -webkit-transform: translateX(0);
        }
        100% {
            opacity: 1;
            -webkit-transform: translateX(-100%);
        }
    }

    .triple {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: px2rem(20px);
        padding-bottom: px2rem(20px);
        span {
            color: #999;
        }
    }

    .button {
        margin: px2rem(60px) auto 0;
        width: 90%;
        color: #fff;
        height: px2rem(98px);
        line-height: px2rem(98px);
        text-align: center;
        font-size: px2rem(30px);
        background: #e95504;
        display: block;
        border: none;
        border-radius: px2rem(10px);
        a {
            color: white;
        }
    }

    .mint-cell {
        height: px2rem(110px) !important;
        line-height: px2rem(110px) !important;
        min-height: 0 !important;
        background: none;
        margin: 0 !important;
        display: flex !important;
        .mint-cell-wrapper {
            padding: 0;
            font-size: px2rem(20px);
            background-size: 120% 0 !important;
            .mintui-field-error {
                margin-right: 0 !important;
            }
        }
    }

    .mint-cell:last-child {
        background-size: 120% 0 !important;
    }

    /*
      空状态公用
    */

    .nullstatus {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding-top: px2rem(350px);
        img {
            width: px2rem(96px);
            margin-bottom: px2rem(10px);
        }
        span {
            font-size: px2rem(26px);
            color: #999;
        }
    }

    /*
          上拉动画
        */

    .mint-spinner-double-bounce {
        margin: 0.5rem auto 0;
    }

    .cxLoad {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: px2rem(26px);
        color: #9f9f9f;
        height: px2rem(62px);
    }

    /*
           弹窗样式
         */

    .mint-msgbox {
        .mint-msgbox-title {
            color: #505050;
            font-size: px2rem(32px);
        }
        .mint-msgbox-message {
            font-size: px2rem(30px);
            color: #666;
            line-height: px2rem(52px);
            text-align: center;
        }
        .mint-msgbox-btn {
            font-size: px2rem(26px);
        }
        .mint-msgbox-confirm {
            color: #ea5504;
        }
        .mint-msgbox-cancel {
            color: #505050;
        }
    }

    .el-collapse-item__arrow {
        transform: rotate(-90deg);
    }

    input,
    textarea {
        -webkit-appearance: none;
        border: 1px solid #ccc;
        /* 方法2 */
    }

    .rotate {
        transform: rotate(180deg);
    }

    /*
    折叠面板样式
    */
    .el-collapse {
        border: none;
        .el-collapse-item {
            margin-bottom: px2rem(10px);
        }
        .el-collapse-item__content {
            padding-bottom: 0;
        }
        .el-collapse-item__arrow {
            margin-right: px2rem(30px);
        }
    }

    .el-collapse-item__header {
        height: px2rem(72px);
        line-height: px2rem(72px);
        font-size: px2rem(28px);
        padding-left: px2rem(24px);
        border-bottom: none;
        .el-collapse-item__arrow {
            line-height: px2rem(72px);
        }
    }

    .mint-indicator-mask {
        z-index: 10000;
    }

    .section {
        background: #fff;
        margin-top: px2rem(18px);
    }

    .section:first-of-type {
        margin-top: 0;
    }

    /*表单*/

    .msg_list {
        position: relative;
        line-height: px2rem(110px);
        min-height: px2rem(110px);
        background: #fff;
        li {
            width: 100%;
            display: block;
            a {
                display: block;
                position: relative;
                margin-left: px2rem(30px);
                margin-right: px2rem(30px);
                border-bottom: 1px solid #e5e5e5;
                height: px2rem(110px);
                box-sizing: border-box;
                overflow: hidden;
                div {
                    img {
                        float: left;
                        width: px2rem(40px);
                        padding-top: px2rem(22px);
                        margin-right: px2rem(15px);
                    }
                    i {
                        float: left;
                        font-size: px2rem(40px);
                        margin-right: px2rem(15px);
                        color: #ea5504;
                    }
                    .text {
                        width: 90%;
                        float: left;
                        border: none;
                        background: none;
                        font-size: px2rem(30px);
                        color: #505050;
                        height: px2rem(110px); //line-height: px2rem(109px);
                    }
                    .text1 {
                        width: 50%;
                        float: left;
                        border: none;
                        height: px2rem(110px);
                        background: none;
                        font-size: px2rem(30px);
                        color: #505050;
                    }
                    .mint-cell-value {
                        font-size: px2rem(30px);
                        color: #505050;
                    }
                    .mintui-field-error {
                        color: #9f9f9f;
                    }
                    em {
                        position: absolute;
                        right: px2rem(0px);
                    }
                    button {
                        color: #787878;
                        font-size: px2rem(30px);
                        height: px2rem(60px);
                        line-height: px2rem(60px);
                        display: block;
                        float: right;
                        border: none;
                        border-left: 1px solid #f1f1f1;
                        padding-left: px2rem(20px);
                        margin-top: px2rem(25px);
                        background: none;
                    }
                }
            }
            a:last-of-type {
                border-bottom: none;
            }
            a:after {
                content: "";
                display: block;
                clear: both;
                visibility: hidden;
                height: 0;
                zoom: 0;
            }
        }
        .message {
            position: relative;
            float: left;
            margin: 0;
            height: auto;
            width: 25%;
            color: #787878;
            font-size: px2rem(26px);
            display: flex;
            align-items: center;
            em {
                width: px2rem(18px);
                height: px2rem(18px);
                background: #e95504;
                border-radius: 50%;
                margin-top: px2rem(35px);
            }
        }
    }

    .arrow_right {
        position: relative;
        display: block;
        width: 17px;
        height: px2rem(87px);
        background: url(./assets/img/arange.png) no-repeat;
        background-position: right center;
        background-size: auto 30%;
    }

    .arrow_kefu {
        position: relative;
        display: block;
        /*width:17px;*/
        height: px2rem(87px);
        background-position: right center;
        background-size: auto 30%;
        font-size: px2rem(26px);
        color: #a0a0a0;
    }

    .msg_list li a > div > label {
        float: left;
        color: #505050;
        font-size: px2rem(30px);
    }

    .float_right {
        float: right;
    }

    .ment {
        p {
            display: inline-block;
        }
        span {
            color: #787878;
        }
        text-align: center;
        color: #a0a0a0;
        font-size: px2rem(26px);
        margin-top: px2rem(32px);
    }

    .prompt {
        width: px2rem(540px);
        height: px2rem(80px);
        color: #f7931e;
        font-size: px2rem(26px);
        background: #eaeaea;
        text-align: center;
        line-height: px2rem(80px);
        margin: px2rem(50px) auto;
        display: none;
    }

    .forget {
        padding: 0 px2rem(35px);
        height: px2rem(70px);
    }

    .forget .x_in {
        color: #787878;
        font-size: px2rem(26px);
        float: left;
    }

    .forget .x_sel {
        color: #f7931e;
        font-size: px2rem(26px);
        float: right;
    }

    .loadingText {
        text-align: center;
        height: px2rem(68px);
        line-height: px2rem(68px);
        color: #c7c7c7;
        font-size: px2rem(22px);
    }
    .mint-indicator-wrapper{
        z-index: 999;
    }
</style>
