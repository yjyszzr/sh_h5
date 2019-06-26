<template>
    <div class="jing-cai" :style="{width:'100%'}">
        <!--未登录-->
        <div v-if="baseDate.lenth!=0" class="body">
            <p class="active-describe" @click="activeDescribe">活动说明</p>
            <p class="money">{{baseDate.bonusPool}} <span>元</span></p>
            <p class="describe">奖池奖金</p>
            <p class="person">{{baseDate.numOfPeople}}人次参加竞猜</p>
            <p class="memo">备注：每增加一人参与竞猜，奖池奖金增加1元</p>
            <div class="history">
                <p @click="lookupRecord">查看上期中奖记录</p>
                <p v-if="login" @click="lookMyRecord">查看我的竞猜记录</p>
            </div>
            <div class="team">
                <div class="img-box">
                    <img :src="baseDate.homeTeamPic" alt="">
                </div>
                <div>
                    <p class="team-name">
                        <span>{{baseDate.homeTeamAbbr}}</span>
                        VS
                        <span>{{baseDate.visitingTeamAbbr}}</span>
                    </p>
                    <!--<p class="active-time">-->
                    <!--活动倒计时：<span>{{stopTime}}</span>-->
                    <!--</p>-->
                </div>
                <div class="img-box">
                    <img :src="baseDate.visitingTeamPic" alt="">
                </div>
            </div>
            <!--answerTimeStatus = 0 代表本次答题活动已结束,1开始,2未开始-->
            <!--未登录-->
            <template v-if="!login">
                <p class="once-time" v-if="baseDate.answerTimeStatus=='0'">本期竞猜已截止，下次早点哦！</p>
                <p class="once-time" v-if="baseDate.answerTimeStatus=='2'">本期竞猜未开始，稍等片刻！</p>
                <p class="once-time" v-if="baseDate.answerTimeStatus=='1'">活动倒计时 ：{{timesd}}</p>
            </template>
            <!--登录-->
            <template v-if="login">
                <template v-if="baseDate.userGetAwardStatus !='3'">
                    <p class="once-time" v-if="baseDate.userGetAwardStatus=='0'">很遗憾，您本期未中奖！</p>
                    <p class="once-time yellow" v-if="baseDate.userGetAwardStatus=='2'">恭喜中奖 {{baseDate.reward}}元</p>
                    <p class="once-time" v-if="baseDate.userGetAwardStatus=='4'||baseDate.userGetAwardStatus=='1'">待开奖</p>
                </template>
                <template v-if="baseDate.userGetAwardStatus =='3'">
                    <p class="once-time" v-if="baseDate.answerTimeStatus=='0'">本期竞猜已截止，下次早点哦！</p>
                    <p class="once-time" v-if="baseDate.answerTimeStatus=='2'">本期竞猜未开始，稍等片刻！</p>
                    <p class="once-time" v-if="baseDate.answerTimeStatus=='1'">竞猜活动结束倒计时{{timesd}}</p>
                </template>
            </template>
            <p class="tishi">*橙色标识的是您的竞猜选项，对号的为猜中</p>
            <ul v-if="questionAndAnswersList.length!=0" class="ul-box">
                <li v-for="(item,index) in questionAndAnswersList" :key=index>
                    <p>{{item.questionSetting}}</p>
                    <div class="btn-box">
                        <div :class="item.isSelected == '0'||item.answerStatus1=='1'?'cur':''" @click="itemClic('0',item,$event)">
                            {{item.answerSetting1}}
                            <span v-if="item.rightAnswerStatus1 =='1'"><img src="./images/yes.png" alt=""></span>
                        </div>
                        <div :class="item.isSelected == '1'||item.answerStatus2=='1'?'cur':''" @click="itemClic('1',item,$event)">
                            {{item.answerSetting2}}
                            <span v-if="item.rightAnswerStatus2=='1'"><img src="./images/yes.png" alt=""></span>
                        </div>
                    </div>
                </li>
            </ul>
            <p v-if="baseDate.answerTimeStatus=='1'" @click="add" class="jingcai-now">
                <template v-if="!HaveRightAnswer">
                    立即竞猜
                </template>
            </p>
        </div>

        <mt-popup
                v-model="popupVisible"
                :modal=true
                popup-transition="popup-fade">
            <div class="pop">
                <p class="pop-title">活动说明</p>
                <div class="pop-body">
                    <p>1.用户累计购彩满20元即可获得1次竞猜机会，参与竞猜只能提交一次答案，提交后不能更改，请谨慎选择。</p>
                    <p>2.需竞猜该场比赛的所有问题，全部答对即可瓜分奖池内的奖金。</p>
                    <p>3.每次竞猜设置奖池初始奖金，每1人次参加竞猜，奖池奖金将增加1元，上不封顶，若6个选项全部答对，将瓜分奖池内的奖金。</p>
                    <p>4.竞猜所得奖金直接发放至账户余额，只可用于购彩不能提现，购彩中奖奖金可以提现。</p>
                    <p>5.本活动最终解释权归平台所有。</p>
                </div>
            </div>
        </mt-popup>

    </div>
</template>

<style lang="scss">
    @import "../../../assets/css/function.scss";

    .jing-cai {
        background: url("./images/base.jpg") no-repeat center;
        background-size: 100% auto;
        height: 100%;
        overflow: auto;
        .pop{
            width: px2rem(600px);
            margin: 0 auto;
            padding: px2rem(40px) px2rem(30px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .pop-title{
                line-height: px2rem(60px);
                font-size: 0.4rem;
                font-weight: 700;
            }
            .pop-body{
                p{
                    font-size: 0.4rem;
                    color: #666;
                    line-height: px2rem(50px)
                }
            }
        }
        .body {
            height: auto;
            padding-bottom: px2rem(50px);
            .tishi{
                color: #ffffff;
                margin-top: px2rem(15px);
                font-size: px2rem(18px) !important;
            }
            min-height: px2rem(1400px);

            .cur {
                background-color: #ea5504 !important;
                border: 0 none!important;
                padding: px2rem(16px) 0!important;
                width: px2rem(282px) !important;
            }
            .yellow{
                color: #f8d15c!important;
            }
            position: relative;
            .active-describe {
                position: absolute;
                padding: 0 px2rem(20px);
                right: 0px;
                top: px2rem(50px);
                line-height: px2rem(48px);
                color: #ffffff;
                border-radius: px2rem(24px) 0 0 px2rem(24px);
                background: rgba(179, 179, 179, .5);
            }
            display: flex;
            /*justify-content: center;*/
            align-items: center;
            flex-direction: column;
            .money {
                margin-top: px2rem(112px);
                font-size: px2rem(76px);
                color: #f8d15c;
                span {
                    font-size: px2rem(48px);
                }
            }
            .describe {
                font-size: px2rem(42px);
                color: #ffffff;
            }
            .person {
                color: #f8d15c;
                font-size: px2rem(36px);
                margin-top: px2rem(12px);
            }
            .memo {
                margin-top: px2rem(22px);
                border: 1px solid #9f9f9f;
                color: #cccccc;
                font-size: px2rem(26px);
                padding: px2rem(5px) px2rem(10px);
            }
            .history {
                margin-top: px2rem(38px);
                display: flex;
                flex-direction: row;
                p {
                    font-size: px2rem(26px);
                    color: #cccccc;
                    padding: 0 px2rem(20px);
                    text-decoration: underline
                }
            }
            .team {
                margin-top: px2rem(48px);
                display: flex;
                flex-direction: row;
                align-items: center;
                border-radius: px2rem(10px);
                background-color: rgba(49, 60, 19, .5);
                padding: px2rem(36px) px2rem(28px) px2rem(45px) px2rem(28px);
                .team-name {
                    font-size: px2rem(34px);
                    color: #ffffff;
                    span {
                        padding: 0 px2rem(30px);
                    }
                }
                .img-box {
                    height: px2rem(80px);
                    width: px2rem(80px);
                    border-radius: 100%;
                    overflow: hidden;
                    img {
                        width: 100%;
                    }
                }
                .active-time {
                    text-align: center;
                    font-size: px2rem(24px);
                    color: #ffffff;
                    margin-top: px2rem(10px);
                }

            }
            .once-time {
                margin-top: px2rem(24px);
                font-size: px2rem(30px);
                color: #cccccc;

            }
            .ul-box {
                margin-top: px2rem(50px);
                li {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    padding: px2rem(10px) 0;
                    color: white;
                    p {
                        font-size: px2rem(36px);
                    }
                    .btn-box {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        div {
                            margin: px2rem(30px);
                            padding: px2rem(15px) 0;
                            border: 1px solid #ffffff;
                            font-size: px2rem(28px);
                            width: px2rem(280px);
                            text-align: center;
                            position: relative;
                            span{
                                display: inline-block;
                                position: absolute;
                                height: px2rem(40px);
                                width: px2rem(40px);
                                right: px2rem(0px);
                                bottom: px2rem(0px);
                                img{
                                    width: 100%;
                                }
                            }
                        }
                    }
                }
            }
            .jingcai-now {
                width: px2rem(600px);
                color: #ffffff;
                line-height: px2rem(80px);
                background: rgb(234, 85, 4);
                text-align: center;
                font-size: px2rem(24px);
                margin-bottom: px2rem(100px);
            }
        }
    }
</style>
<script>
    import {means,nativeApp} from '../../../util/common'
    import {Toast,Popup,Indicator} from 'mint-ui'
    import api from '../../../fetch/api'

    export default {
        name: "jingcai",
        beforeCreate() {
            Indicator.open()
        },
        data() {
            return {
                popupVisible:false,
                matchId:this.$route.query.matchId,//赛事ID
                questionAndAnswersList: [],
                baseDate: {},
                timesd: '',
                timeId: '',//计时器
                qudata: [], //答案数据
                // answerAllPull:'',//答案是否提交
                HaveRightAnswer:false, //是否已经公布正确答案
                fromeRouter:'',//在哪个路由来
                token:'',
                login: false,
            }
        },
        created() {
            this.$nextTick(()=>{
                if(this.$route.query.cfrom=='app'){
                    if(!this.fromeRouter){
                        localStorage.clear()
                    }else{
                        this.token = localStorage.getItem('token')?localStorage.getItem('token'):''
                        if(this.token!==''){
                            this.login = true
                        }
                    }
                }
            })
            if(this.$route.query.cfrom=='app'){
                let that = this
                window.actionMessage = function (arg) {
                    if(JSON.parse(arg).token!==''){
                        that.token = JSON.parse(arg).token
                        that.login = true
                        localStorage.setItem('token', JSON.parse(arg).token)
                    }
                }
            }else{
                if(localStorage.getItem('token')){
                    this.login = true
                }else{
                    this.login = false
                }
            }
            setTimeout(()=>{
                this.getDetails()
            },1000)
        },
        computed: {},
        mounted(){
            nativeApp({'methodName':'showTitle','title':'竞猜'})
            means('竞猜').isTitle
        },
        methods: {
            // 活动介绍
            activeDescribe() {
                this.popupVisible = true
            },
            // 查看上期纪录
            lookupRecord() {
                this.$router.push({
                    path: "/activity/upRecord",
                    query:{matchId:this.matchId,showtitle:'1'}
                })
            },
            // 查看我的竞猜纪录
            lookMyRecord() {
                // if(this.$route.query.cfrom=='app'&&this.token===''){
                //     location.href = 'http://m.caixiaomi.net?cxmxc=scm&type=5&usinfo=1'
                //     return false
                // }
                // if(!localStorage.getItem('token')){
                //     this.$router.push({path:'/user/sms'})
                //     return false
                // }
                this.$router.push({
                    path: "/activity/recordedList",
                    query:{matchId:this.matchId,showtitle:'1'}
                })
            },
            //获取竞猜详情
            getDetails() {
                var that = this
                let data = {
                    matchId:this.matchId,
                    // matchId: '18021'
                }
                api.guessingCompetitionDetails(data)
                    .then(res => {
                        if (res.code == 0) {
                            this.baseDate = res.data
                            this.questionAndAnswersList = res.data.questionAndAnswersList
                            if (this.baseDate.answerTimeStatus == '1') {
                                this.stopTime()
                            }
                            this.questionAndAnswersList.forEach(item=>{
                                if(item.rightAnswerStatus1=='1'||item.rightAnswerStatus2=='1'){
                                    that.HaveRightAnswer = true
                                }
                                if(item.answerStatus1=='1'||item.answerStatus2=='1'){
                                    // this.answerAllPull = "已经提交"
                                    this.HaveRightAnswer = true
                                }
                            })
                        }
                    })
            },
            //点击item
            itemClic(type, item, c) {
                if(this.baseDate.answerTimeStatus=='1'){
                    if(this.$route.query.cfrom=='app'&&this.token===''){
                        location.href = 'http://m.caixiaomi.net?cxmxc=scm&type=5&usinfo=1'
                        return false
                    }
                    if(!localStorage.getItem('token')){
                        this.$router.push({path:'/user/sms'})
                        return false
                    }
                    if(this.HaveRightAnswer==false){
                        if(this.baseDate.chance == '1'){
                            this.$set(item, 'isSelected', type)
                        }else {
                            Toast("您还需再消费"+this.baseDate.onceBettingAmount+"元才有机会参加呢亲！")
                        }
                    }
                }
            },
            // 提交答案
            add() {
                if(this.$route.query.cfrom=='app'&&this.token===''){
                    location.href = 'http://m.caixiaomi.net?cxmxc=scm&type=5&usinfo=1'
                    return false
                }
                if(!localStorage.getItem('token')){
                    this.$router.push({path:'/user/sms'})
                    return false
                }
                var that = this
                if(!this.HaveRightAnswer){
                    if($('.cur').length<this.questionAndAnswersList.length){
                            Toast("请将所有问题答完！")
                            return false;
                        }
                        let arr= []
                        this.questionAndAnswersList.forEach(item => {
                            let obj = {
                                answerStatus1 : '0',
                                answerStatus2 : '0',
                                questionNum:item.questionNum
                            }
                            if (item.isSelected == '0') {
                                obj.answerStatus1 = '1'
                                obj.answerStatus2 = '0'
                            }else if(item.isSelected == '1'){
                                obj.answerStatus1 = '0'
                                obj.answerStatus2 = '1'
                            }
                            arr.push(obj)
                        })
                        let data = {
                            answers:arr,
                            matchId:this.matchId,
                            // matchId:'18021'
                        }
                        api.add(data)
                            .then(res => {
                                if (res.code == 0) {
                                    this.HaveRightAnswer = true
                                    // this.answerAllPull = "已经提交"
                                    that.baseDate.userGetAwardStatus = '4'
                                    Toast("答案提交成功!")
                                }
                            })
                }else {
                    Toast("不可重复提交！")
                }
            },
            // 活动倒计时
            stopTime() {
                var that = this
                //获取当前时间
                var date = new Date();
                var now = date.getTime();
                //时间差
                var leftTime = this.baseDate.stopTime * 1000 - now;
                //定义变量 d,h,m,s保存倒计时的时间
                var d, h, m, s;
                if (leftTime >= 0) {
                    d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                    h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
                    m = Math.floor(leftTime / 1000 / 60 % 60);
                    s = Math.floor(leftTime / 1000 % 60);
                }
                if(h<10){h="0"+h.toString()}
                if(m<10){m="0"+m.toString()}
                if(s<10){s="0"+s.toString()}
                that.timesd = " "+h+':'+ m + ':'+ s
                that.timeId = setTimeout(function () {
                    that.stopTime()
                }, 1000)

            }
        },
        destroyed() {
            window.clearInterval(this.timeId)
        },
        beforeRouteEnter(to,from,next){
            next(vm=>{
                vm.fromeRouter = from.name
            })
        }
    }
</script>