<template>
    <div class="Header" @touchmove.prevent>
        <!--头部-->
        <div class="headerTop" v-show="showTitle">
            <a @click="return_back()" class="go_return"></a>
            <p class="headerText"><span v-if="!$route.path.split('/')[2]">彩小秘·</span>{{title}}</p>
            <div class="filter" v-show="menuDisplay==true">
                <span v-if="$route.path.split('/')[2]=='consult'" style="opacity:0;">分享</span>
                <span v-if="$route.path.split('/')[2]=='consult'&&getUrl()" :class="$store.state.zxDetailObj.isCollect=='1'?'icon-icon-32':'icon-icon-34'" class="iconfont" @click="collection($event)"></span>
                <span v-if="$route.path.split('/')[2]=='collection'" @click="colMenu($event)" class="colMenu">{{deleteFlag?'取消':'编辑'}}</span>
                <span v-if="$route.path.split('/')[2]=='cathectic'" @click="onGal()" class="danxm">胆</span>
                <span v-if="$route.path.split('/')[1]=='user'&&!$route.path.split('/')[2]" @click="setUp()" class="setting">设置</span>
                <ul class="djs" @click="actionSheet()"  v-if="$route.path.split('/')[2]&&$route.path.split('/')[2]=='account'">
                    <li class="tas">{{timeTypeShow(this.timeTypeStatus)}}<i style="font-size: 0.3rem;" class="iconfont icon-icon-22"></i></li>
                </ul>
                <!--比赛模块 头-->
                <div class="lottery-select" v-if="$route.path.split('/')[1]=='lotteryResult'" >
                    <span @click='data_time()' class="data-img" ><img src="./images/date@3x.png" alt=""></span>
                    <span @click='more()'><i class="iconfont icon-icon-21"></i></span>
                </div>
            </div>
            <p class="filter" v-show="menuDisplay==false"></p>
        </div>
        <!--头部tab-->
        <ul class="send" v-if="$route.path.split('/')[2]&&$route.path.split('/')[2]=='record'">
            <li :class="$store.state.recordTab==''||$store.state.recordTab=='1'?'cur':''"><p @click='curClick($event)'>全部</p></li>
            <li :class="$store.state.recordTab=='2'?'cur':''"><p @click='curClick($event)'>中奖</p></li>
            <li :class="$store.state.recordTab=='3'?'cur':''"><p @click='curClick($event)'>待开奖</p></li>
        </ul>

        <ul class="sendaccount" id='searchBar' v-if="$route.path.split('/')[2]&&$route.path.split('/')[2]=='account'">
            <li :class="$store.state.recordTab==''||$store.state.recordTab=='a1'?'cur1':''"><p @click='curClick1($event)'>全部</p></li>
            <li :class="$store.state.recordTab=='a2'?'cur1':''"><p @click='curClick1($event)'>奖金</p></li>
            <li :class="$store.state.recordTab=='a3'?'cur1':''"><p @click='curClick1($event)'>充值</p></li>
            <li :class="$store.state.recordTab=='a4'?'cur1':''"><p @click='curClick1($event)'>购彩</p></li>
            <li :class="$store.state.recordTab=='a5'?'cur1':''"><p @click='curClick1($event)'>提现</p></li>
            <li :class="$store.state.recordTab=='a6'?'cur1':''"><p @click='curClick1($event)'>红包</p></li>
        </ul>
        <ul class="senddetail" id='searchBar' v-if="$route.path.split('/')[2]&&$route.path.split('/')[2]=='detail'">
            <li class="cur2"><p @click='curClick2($event)'>未使用</p></li>
            <li><p @click='curClick2($event)'>已使用</p></li>
            <li><p @click='curClick2($event)'>已过期</p></li>
        </ul>
        <ul class="send" id='searchBar' v-if="$route.path.split('/')[2]&&$route.path.split('/')[2]=='message'">
            <li :class="$store.state.recordTab==''||$store.state.recordTab=='m1'?'cur3':''"><p @click='curClick3($event)'>通知</p></li>
            <li :class="$store.state.recordTab=='m2'?'cur3':''"><p @click='curClick3($event)'>消息</p></li>
        </ul>
        <p class="matchHeader"  v-if="$route.path.split('/')[2]&&$route.path.split('/')[2]=='cathectic'">已选{{$store.state.matchSelectedList.length}}场比赛&nbsp;&nbsp;&nbsp;投注截止时间：<span>{{$store.state.arrTime.length==0?'00-00 00:00':datePd($store.state.arrTime[0])}}</span></p>
        <div v-if="$route.path.split('/')[2]&&$route.path.split('/')[2]=='help'">
            <ul class="help_ul" >
                <li><a href="" @click.prevent="custormAnchor('a1')">账户问题</a></li>
                <li><a href="" @click.prevent="custormAnchor('a2')">充值问题</a></li>
                <li><a href="" @click.prevent="custormAnchor('a3')">提现问题</a></li>
                <li><a href="" @click.prevent="custormAnchor('a4')">购彩问题</a></li>
                <li><a href="" @click.prevent="custormAnchor('a5')">中奖派奖问题</a></li>
                <li><a href="" @click.prevent="custormAnchor('a6')">玩法帮助</a></li>
            </ul>
            <div v-if="$route.path.split('/')[2]&&$route.path.split('/')[2]=='help'" style="height: 10px; background: #f1f1f1;width: 100%"></div>
        </div>
        <!--比赛结果 未结束、已结束、我的比赛-->
        <ul class="list" v-if="$route.path.split('/')[1]=='lotteryResult'">
            <li v-for="item in lotteryResultTable" @click="lotteryTable($event,item.key)" :key='item.key' :class="item.key==activeIndex?'findactive':''">
                <p>{{item.name}}</p>
                <!--<span class="iconNum">{{item.cont}}</span>-->
            </li>
        </ul>
        <div class="swiper-container findTab" v-if="$route.path.split('/')[1]=='find'">
            <div class="swiper-wrapper">
                <div class="swiper-slide" @click="findTabClick($event,item.cat)" v-for="item in findTab" :key='item.cat' :class="item.cat==findStatus?'findactive':''">
                    <p>{{item.catName=='世界杯'?'其他':(item.catName=='竞彩预测'?'重心推荐':item.catName)}}</p>
                </div>
            </div>
        </div>
        <mt-actionsheet
                :actions= "action"
                cancelText=""
                v-model="sheetVisible">
        </mt-actionsheet>


    </div>

</template>

<script>
    import datefilter from "../../../util/datefilter";
    import { Indicator,Actionsheet } from "mint-ui";
    import { getUrlStr, isWebview } from "../../../util/common";
    export default {
        name: "Header",
        props: {
            title: String,
            menuDisplay: Boolean,
            menuNosult: Boolean,
            showTitle: Boolean
        },
        data() {
            return {

                activeNames: ['1'],//默认转开第一个
                flag: true,
                action:[
                    {
                        name:'全部',
                        method:this.whole
                    },
                    {
                        name:'当天',
                        method:this.sameDay
                    },
                    {
                        name:'最近一周',
                        method:this.recentMarch
                    },
                    {
                        name:'最近一月',
                        method:this.lastmonth
                    },
                    {
                        name:'最近三月',
                        method:this.recentMarchs
                    }
                ],
                sheetVisible: false,
                lotteryResultTable:[
                    {
                        name:"未结束",
                        cont:0,
                        key:'0'
                    },
                    {
                        name:"已结束",
                        cont:0,
                        key:'1'
                    },
                    {
                        name:"我的比赛",
                        cont:0,
                        key:'2'
                    }
                ],
                resultBage:{}
            };
        },
        methods: {
            handleChange(val) {
                console.log(val);
            },
            timeTypeShow(c){
                switch (c){
                    case 0 : return '全部'
                    case 1 : return '当天'
                    case 2 : return '最近一周'
                    case 3 : return '最近一月'
                    case 4 : return '最近三月'
                }
            },
            actionSheet:function () {
                this.sheetVisible = true
                let liList = $('.mint-actionsheet-listitem')
                liList.forEach(item => {
                    item.className='mint-actionsheet-listitem'
                    if(item.innerText==$('.tas')[0].innerText){
                        item.className='mint-actionsheet-listitem liActive'
                    }
                });
            },
            whole:function () {
                this.$store.dispatch("changeTimeType", 0);
            },
            sameDay:function ($event) {
                this.$store.dispatch("changeTimeType", 1);
            },
            recentMarch:function () {
                this.$store.dispatch("changeTimeType", 2);
            },
            lastmonth:function () {
                this.$store.dispatch("changeTimeType", 3);
            },
            recentMarchs:function () {
                this.$store.dispatch("changeTimeType", 4);
            },
            return_back() {
                if (this.$route.path.split("/")[2]) {
                    if(this.$route.path.split("/")[2] == "quickinfo"&&!this.$route.query.from){
                        location.href = 'caixm://caixiaomi.net'
                        return false;
                    }
                    if (
                        location.href.split("?")[1] &&
                        location.href.split("?")[1].split("=")[0] == "orderStatus"
                    ) {
                        this.$router.push({
                            path: "/",
                            replace: false
                        });
                        return false;
                    }
                }
                this.$router.go(-1);
            },
            datePd(c) {
                return datefilter(Number(c * 1000), 3);
            },
            onGal(){
                this.$router.push({
                    path: "/freebuy/explain",
                    replace: false
                });
            },
            setUp(){
                this.$router.push({
                    path: "/user/setup",
                    replace: false
                });
            },
            custormAnchor(anchorName) {
                // 找到锚点
                let anchorElement = document.getElementById(anchorName);
                // 如果对应id的锚点存在，就跳转到锚点
                if (anchorElement) {
                    anchorElement.scrollIntoView();
                }
            },
            colMenu(c) {
                if (this.deleteFlag == false) {
                    this.$store.dispatch("deleteMyFlag", true);
                } else {
                    this.$store.dispatch("deleteMyFlag", false);
                }
            },
            curClick(c) {
                $(".cur").removeClass("cur");
                c.target.parentElement.className = "cur";
                if (c.target.innerText == "全部") {
                    this.$store.dispatch("changeRecordTab", "1");
                } else if (c.target.innerText == "中奖") {
                    this.$store.dispatch("changeRecordTab", "2");
                } else if (c.target.innerText == "待开奖") {
                    this.$store.dispatch("changeRecordTab", "3");
                }
            },
            curClick1(c) {
                $(".cur1").removeClass("cur1");
                c.target.parentElement.className = "cur1";
                if (c.target.innerText == "全部") {
                    this.$store.dispatch("changeRecordTab", "a1");
                } else if (c.target.innerText == "奖金") {
                    this.$store.dispatch("changeRecordTab", "a2");
                } else if (c.target.innerText == "充值") {
                    this.$store.dispatch("changeRecordTab", "a3");
                } else if (c.target.innerText == "购彩") {
                    this.$store.dispatch("changeRecordTab", "a4");
                } else if (c.target.innerText == "提现") {
                    this.$store.dispatch("changeRecordTab", "a5");
                } else if (c.target.innerText == "红包") {
                    this.$store.dispatch("changeRecordTab", "a6");
                }
            },
            curClick2(c) {
                $(".cur2").removeClass("cur2");
                c.target.parentElement.className = "cur2";
                if (c.target.innerText == "未使用") {
                    this.$store.dispatch("changeRecordTab", "d1");
                } else if (c.target.innerText == "已使用") {
                    this.$store.dispatch("changeRecordTab", "d2");
                } else if (c.target.innerText == "已过期") {
                    this.$store.dispatch("changeRecordTab", "d3");
                }
            },

            curClick3(c) {
                $(".cur3").removeClass("cur3");
                c.target.parentElement.className = "cur3";
                if (c.target.innerText == "通知") {
                    localStorage.setItem("itemStatus", 1);
                    this.$store.dispatch("changeRecordTab", "m1");
                } else if (c.target.innerText == "消息") {
                    localStorage.setItem("itemStatus", 2);
                    this.$store.dispatch("changeRecordTab", "m2");
                }
            },
            collection(c) {
                if (c.target.className == "iconfont icon-icon-34") {
                    this.$store.dispatch("getCollectionFlag", true);
                    c.target.className = "iconfont icon-icon-32";
                } else {
                    this.$store.dispatch("getCollectionFlag", false);
                    c.target.className = "iconfont icon-icon-34";
                }
            },
            data_time() {
                this.$store.dispatch("getMarkShow", true);
                this.$store.dispatch("getMarkShowType", 1);
                // this.router.push({path:'/lotteryResult'})
            },
            more() {
                this.$store.dispatch("getMarkShow", true);
                this.$store.dispatch("getMarkShowType", 2);
            },
            getUrl() {
                if (getUrlStr("frz", location.href) == undefined) {
                    return true;
                } else {
                    if (getUrlStr("frz", location.href) == "1") {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            findTabClick(c,s){
                if(c.target.localName=='p'&&c.target.parentElement.className.indexOf('findactive')==-1){
                    Indicator.open()
                    $('.findactive').removeClass('findactive')
                    c.target.parentElement.className = "swiper-slide findactive";
                    this.$store.dispatch("changeFinActive",s)
                }
            },
            lotteryTable(c,s){
                Indicator.open()
                this.$store.commit("LOTTERYRESULTTABLEINDEX",s)
                let data={
                    dateStr: this.$store.state.mark_showObj.mark_dateVal,
                    leagueIds: this.$store.state.mark_showObj.leagueIds,
                    type:this.$store.state.mark_showObj.lotteryResultTableIndex,
                }
                Indicator.open();
                this.$store.dispatch("getResultList", data);
            }
        },
        computed: {
            deleteFlag() {
                return this.$store.state.deleteFlag;
            },
            zxCollectionFlag() {
                return this.$store.state.zxCollectionFlag;
            },
            activeIndex(){
                return this.$store.state.mark_showObj.lotteryResultTableIndex;
            },
            findTab() {
                return this.$store.state.findObj.findTab;
            },
            findStatus() {
                return this.$store.state.findObj.findActive;
            },
            timeTypeStatus(){
                return this.$store.state.user_account.timeType;
            },
            resultList(){
                return this.$store.state.resultList;
            },
            channelObj(){
                return this.$store.state.channelObj;
            }
        },
        watch:{
            $route(to,from){
                if(from.path=='/user/account'){
                    this.sheetVisible = false
                }
            },
            resultList(a,b){
                this.lotteryResultTable.forEach(item => {
                      if(item.name=='未结束'){
                          item.cont =  a.notfinishCount
                      }
                      else if(item.name=='已结束'){
                          item.cont =  a.finishCount
                      }
                      else if(item.name=='我的比赛'){
                          item.cont =  a.matchCollectCount
                      }
                });
            }
        }
    };
</script>


<style lang='scss' scoped>
    @import "../../../assets/css/function.scss";
    .Header {
        width: 100%;
        .mint-actionsheet-listitem, .mint-actionsheet-button{
            font-size: px2rem(28px)!important;
        }
        .headerTop {
            overflow: hidden;
            height: px2rem(100px);
            background: #f4f4f4;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .go_return {
                flex: 1;
                // padding-left: px2rem(80px);
                height: 100%;
                background: url("../../../assets/img/ret.png") no-repeat;
                background-position: px2rem(34px) center;
                background-size: px2rem(30px) auto;
                vertical-align: middle;
            }
            .filter {
                flex: 1;
                display: flex;
                height: 100%;
                width: px2rem(138px);
                box-sizing: border-box;
                ul{
                    display: block;
                    height: 100%;
                    padding: 0 px2rem(10px) 0 px2rem(10px);
                    display: flex;
                    align-items: center;
                    font-size: px2rem(28px);
                    color: #787878;
                    li{
                        font-size: px2rem(28px);
                    }
                }
                span {
                    display: block;
                    height: 100%;
                    padding: 0 px2rem(10px) 0 px2rem(10px);
                    display: flex;
                    align-items: center;
                    font-size: px2rem(28px);
                    color: #787878;
                }
                .actine_sms {
                    font-size: px2rem(18px);
                }
                .iconfont {
                    font-size: px2rem(30px);
                }
                .colMenu {
                    width: 100%;
                    justify-content: flex-end;
                    padding-right: px2rem(30px);
                    box-sizing: border-box;
                }
                .active_sm {
                    width: 100%;
                    justify-content: flex-end;
                    padding-right: px2rem(30px);
                    box-sizing: border-box;
                    display: block;
                }
                .icon-icon-44 {
                    color: #787878;
                }
                .djs{
                    padding: 0;
                    flex: 1;
                    display: flex;
                    justify-content: flex-end;
                    margin-left: px2rem(-30px);
                    .tas{
                        padding-right: px2rem(30px);
                        .icon-icon-22{
                            margin-left: px2rem(4px);
                        }
                    }
                }
                .setting,.danxm{
                    padding: 0;
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                    padding-right: px2rem(30px);
                }
                .lottery-select{
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    .data-img{
                        img{
                            height: px2rem(30px);
                            width: px2rem(30px);
                        }
                    }
                }
                .daletou-menu{
                    margin-left: 60%;
                }
            }
            .headerText {
                flex: 3;
                height: 100%;
                display: flex;
                align-items: center;
                //width: px2rem(500px);
                font-size: px2rem(32px);
                color: #505050;
                justify-content: center;
            }
        }
        .send,
        .sendaccount,
        .senddetail {
            height: px2rem(88px);
            background: #fff;
            overflow: hidden;
            display: flex;
            border-bottom: 1px solid #f0f0f0;
            li {
                flex: 1;
                height: px2rem(48px);
                margin-top: px2rem(20px);
                border-right: 1px solid #f1f1f1;
                color: #505050;
                font-size: px2rem(30px);
                text-align: center;
                p {
                    height: px2rem(64px);
                    display: block;
                    margin: 0 auto;
                }
            }
            .cur p,
            .cur1 p,
            .cur2 p,
            .cur3 p {
                color: #e95504;
                width: 50%;
                border-bottom: 2px solid #e95504;
                display: block;
            }
            li:last-child {
                border-right: none;
            }
        }
        .share {
            display: flex;
            height: 100%;
            width: 1.84rem;
            font-size: 0.37333rem;
            color: #505050;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            img {
                display: inline-block;
                width: px2rem(32px);
                height: px2rem(32px);
                margin-right: px2rem(10px);
                vertical-align: middle;
            }
        }
        .matchHeader,.wd_nav {
            background: #fff;
            height: px2rem(72px);
            line-height: px2rem(72px);
            padding: 0 px2rem(30px);
            box-sizing: border-box;
            font-size: px2rem(28px);
            color: #a0a0a0;
            width: 100%;
            border-bottom: 1px solid #f0f0f0;
            span {
                color: #e95504;
            }
        }
        .help_ul {
            background: #fff;
            padding: 0 px2rem(32px) px2rem(36px);
            li {
                background: #f6921e;
                display: inline-block;
                font-size: px2rem(26px);
                border-radius: px2rem(10px);
                width: px2rem(200px);
                height: px2rem(57px);
                text-align: center;
                line-height: px2rem(57px);
                margin-top: px2rem(36px);
                margin-right: px2rem(20px);
                a {
                    color: #fff;
                }
            }
            li:nth-child(3) {
                margin-right: 0;
            }
        }
        .list {
            height: px2rem(88px);
            //line-height: px2rem(88px);
            display: flex;
            background: #fff;
            -webkit-box-flex: 1;
            width: 100%;
            border-bottom: 1px solid #f1f1f1;
            box-sizing: border-box;
            li {
                display: flex;
                justify-content: center;
                align-items: center;
                flex: 1;
                line-height: px2rem(88px);
                text-align: center;
                border-right: 1px solid #f1f1f1;
                color: #9f9f9f;
                font-size: px2rem(28px);
                position: relative;
                i {
                    color: #ea5504;
                    font-size: px2rem(20px);
                    right: 0;
                    position: absolute;
                    bottom: 0;
                }
                p{
                    box-sizing: border-box;
                    height: px2rem(84px);
                    font-size: px2rem(26px);
                }
            }
        }
        .findTab {
            background: white;
            height: px2rem(88px);
            line-height: px2rem(88px);
        }
        .swiper-slide {
            width: 25%;
            background: url("../../../assets/img/freebuy_img/line3.png") no-repeat right
            center;
            background-size: 1px px2rem(40px);
            text-align: center;
            color: #505050;
            p {
                margin: 0 px2rem(38px);
                height: px2rem(84px);
                font-size: px2rem(26px);
            }
        }
        .findactive {
            color: #ea5504!important;
            p {
                border-bottom: px2rem(4px) solid #ea5504;
            }
            span {
                background-color: rgba(200,85,4,.6);
            }
        }
        .swiper-slide:last-of-type {
            background: none;
        }

        .icon-img{
            display: inline-block;
            height: px2rem(30px);
            width: px2rem(30px);
            background: url('./images/date@3x.png') no-repeat center;
            background-size: 100%;
        }
        .iconNum{
            margin-left: px2rem(8px);
            display: inline-block;
            font-size: px2rem(16px);
            background-color: #9f9f9f;
            color: #ffffff;
            line-height: px2rem(30px);
            width: px2rem(30px);
            text-align: center;
            border-radius: px2rem(5px);
        }
    }
</style>

