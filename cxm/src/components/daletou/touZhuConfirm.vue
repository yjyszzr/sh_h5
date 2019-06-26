<template>
    <div class="touzhu-confirm">
        <!--头部开始-->
        <div class="head" v-show="isWeb()">
            <span class="back-img" @click="goBack()"><img src="../../assets/img/ret.png" alt=""></span>
            <div class="head-text">
                <span>彩小秘·投注确认</span>
            </div>
            <div class="memu"></div>
        </div>
        <!--躯干-->
        <div class="body">
            <div class="add">
                <div class="add-item" @click="handAdd()">
                    <span class="img-box"><img src="./images/AddManully@3x.png" alt=""></span>
                    <p>手动添加</p>
                </div>
                <div class="add-item" @click="machineSelection('0')">
                    <span class="img-box"><img src="./images/Add@3x.png" alt=""></span>
                    <p>机选1注</p>
                </div>
                <div class="add-item" @click="machineSelection('1')">
                    <span class="img-box"><img src="./images/Add@3x.png" alt=""></span>
                    <p>机选5注</p>
                </div>
            </div>
            <div class="zhu-box" :style="{'top':isWeb()?'':'1.35rem'}">
                <ul class="item-ul">
                    <li class="item-li" v-for='(item,index) in conformBallList' :key=index>
                        <span class="delimg" @click="delItem(index)"><img src="../../assets/img/sut.png" alt=""></span>
                        <div class="item-text">
                            <div class="item-num">
                                <ul class="sun-ul">
                                    <li class="item-sun-li" v-for="(sunitem,index) in item.ballList" :key=index
                                        :class="(sunitem.type == 'redBall'||sunitem.type=='tuoRedBall'||sunitem.type=='danRedBall')?'redBall':(sunitem.type=='blueBall'||sunitem.type=='danBlueBall'||sunitem.type=='tuoBlueBall')?'blueBall':'gray'">
                                        {{sunitem.num}}
                                    </li>
                                </ul>
                            </div>
                            <p class="item-describe">{{item.msg.danFn}} {{item.msg.zhuNum}}注 {{item.msg.bei}}倍
                                {{item.msg.money+'.00'}} 元</p>
                        </div>
                        <span class="go-detalis" @click="goSelect(item,index)"><img src="../../assets/img/arange.png" alt=""></span>
                    </li>
                </ul>
                <div class="ment"><i class="iconfont icon-icon-29 xySelected" ref='xySelected' @click="xySelectedClick()"> </i> <p> 我已阅读并同意<router-link to="/freebuy/protocol">《彩小秘投注服务协议》</router-link></p></div>
            </div>
        </div>
        <div class="footer">
            <div class="one">
                <div class="add-box" @click="addOne(true)">
                    <div class='add-in'>
                        <span class="add-goOn"><img :src="adds.imgUrl" alt=""></span>
                        <span>追加投注</span>
                    </div>
                    <p>每注追加1元，单注最高奖金1600万</p>
                </div>
                <p class="multiple" @click='mupClick()'>倍数 {{adds.bei}} 倍 <i></i></p>
            </div>
            <div class="two">
                <div class="p1">
                    <p>{{adds.zhuNum}}注 {{adds.bei}}倍 共需：<span>￥{{adds.money+'.00'}}</span> 元</p>
                </div>
                <p :style="{'background':color(canPay),'borderColor':color(canPay)}" class="ok" :class="canPay?'canpay':'nopay'" @click="confirm()">确定</p>
            </div>
        </div>


    </div>
</template>
<style scoped lang="scss">
    @import "../../assets/css/function.scss";

    .touzhu-confirm {
        /*.clearfix:after {content:"."; display:block; height:0; visibility:hidden; clear:both; }*/
        /*.clearfix { *zoom:1; }　*/
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

            }
            .memu {
                width: px2rem(60px);
            }
        }
        .body {
            .xySelected{
                color: #e95504!important;
            }
            .redBall {
                color: #eb1c24 !important;
            }
            .blueBall {
                color: #0081cc !important;
            }
            .gray {
                color: #c7c7c7 !important;
            }
            .add {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row;
                background-color: #ffffff;
                .add-item {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: px2rem(186px);
                    height: px2rem(60px);
                    background: rgba(245, 145, 30, 0.2);
                    margin: px2rem(20px);
                    border-radius: px2rem(20px);
                    font-size: px2rem(26px);
                    color: #f5911e;
                    .img-box {
                        display: inline-block;
                        height: px2rem(40px);
                        width: px2rem(40px);
                        overflow: hidden;
                        img {
                            width: 86%;
                            display: block;
                            margin-top: 1px;
                        }
                    }
                }
            }
            .zhu-box {
                width: 100%;
                position: absolute;
                top: px2rem(200px);
                bottom: px2rem(200px);
                overflow: auto;
                .ment{
                    margin-bottom: px2rem(40px);
                }
                .item-ul {
                    width: 100%;
                    .item-li {
                        /*height: px2rem(140px);*/
                        box-sizing: border-box;
                        width: 100%;
                        background-color: #ffffff;
                        margin: px2rem(10px) 0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: px2rem(30px) px2rem(30px);
                        .item-text {
                            width: 80%;
                            .item-num {
                                font-size: px2rem(32px);
                                .sun-ul {
                                    display: flex;
                                    align-items: center;
                                    flex-direction: row;
                                    flex-wrap: wrap;
                                    li {
                                        padding: 0 px2rem(10px);
                                    }
                                }
                            }
                            .item-describe {
                                font-size: px2rem(26px);
                                color: #787878;
                                padding: px2rem(10px) px2rem(15px);
                            }
                        }
                        .delimg {
                            display: inline-block;
                            padding: px2rem(20px) px2rem(30px) px2rem(20px) 0;

                            img {
                                height: px2rem(30px);
                                width: px2rem(30px);
                                overflow: hidden;
                            }
                        }
                        .go-detalis {
                            display: inline-block;
                            padding: px2rem(20px) 0 px2rem(20px) px2rem(30px);
                            img {
                                height: px2rem(30px);
                                width: px2rem(20px);
                                overflow: hidden;
                            }
                        }
                    }
                }
            }
        }
        .footer {
            box-sizing: border-box;
            width: 100%;
            position: absolute;
            bottom: 0;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            .one {
                display: flex;
                justify-content: space-between;
                height: px2rem(100px);
                .add-box {
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    align-items: left;
                    justify-content: center;
                    padding-left: px2rem(30px);
                    flex: 2;
                    font-size: px2rem(24px);
                    p {
                        color: #9f9f9f;
                    }
                    .add-in {
                        display: flex;
                        align-items: center;
                        margin-bottom: px2rem(5px);
                        .add-goOn {
                            display: inline-block;
                            margin-right: px2rem(15px);
                            img {
                                height: px2rem(34px);
                                width: px2rem(34px);
                            }
                            span{
                                color: #505050;
                            }
                        }
                    }
                }
                .multiple {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex: 1;
                    border-left: 1px solid #f0f0f0;
                    position: relative;
                    font-size: px2rem(26px);
                    color: #505050;
                    i{
                        width: px2rem(20px);
                        height: px2rem(20px);
                        background: url(../../assets/img/free/Clickable@2x.png);
                        position: absolute;
                        top: 0;
                        right: 0;
                        background-size: 100% 100%;
                    }

                }
            }
            .two {
                height: px2rem(100px);
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 24px;
                color: #9f9f9f;
                .p1 {
                    line-height: px2rem(100px);
                    border-top: 1px solid #f0f0f0;
                    padding-left: px2rem(30px);
                    font-size: px2rem(28px);
                    flex: 2;
                    span {
                        color: #ea5504;
                    }
                    p{
                        width: 95%;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
                .ok {
                    flex: 1;
                    /*width: px2rem(250px);*/
                    text-align: center;
                    line-height: px2rem(100px);
                    background-color: #ea5504;
                    border: 1px solid #ea5504;
                    color: #ffffff;
                    font-size: px2rem(28px);
                }
            }
        }
    }
</style>
<script>
    import {getArrayItems,saveDtInfo,sortFn,nativeApp,getCsUrl,isWebview} from '../../util/common'
    import {MessageBox, Popup,Indicator,Toast} from 'mint-ui';
    import SelectionBox from "./images/SelectionBox1@3x.png"
    import Selected from "./images/Selected1@3x.png"
    import api from '../../fetch/api'
    import {mapState} from 'vuex'
    export default {
        name: "touZhuConfirm",
        data() {
            return {
                canPay:true,
                conformBallList: [],
                num:1,
                adds: {
                    add:false,  //是否追加 默认不追加
                    imgUrl: SelectionBox,
                    zhuNum:0,
                    bei: JSON.parse(sessionStorage.getItem('adds'))!=null?JSON.parse(sessionStorage.getItem('adds')).bei:1,
                    money:0,
                    itemEditIndex:-1,
                },
                routerOpen:true,
                redBallBox: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'],
                blueBallBox: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            }
        },
        created() {
            if(JSON.parse(sessionStorage.getItem('adds'))){
                if(JSON.parse(sessionStorage.getItem('adds')).add){
                    this.adds.add = true
                }else{
                    this.adds.add = false
                }
            }
            this.$store.state.mark_playObj.mupNum = 1
            this.$emit('closeMarkCz')
            // this.getBallFn()
            this.addOne()
        },
        mounted(){
            nativeApp({'methodName':'showTitle','title':'投注确认'})
        },
        methods: {
            isWeb(){
                return !isWebview()
            },
            //大小排序
            sorts(Arr,type) {
                let biaozhunballList = []
                let dantuoballList = []
                let ballList = []
                if(type == 'dantuo'){
                    let danRedBallList = []
                    let tuoRedBallList = []
                    let danBlueBallList = []
                    let tuoBlueBallList = []
                    Arr.forEach(item=>{
                        if(item.type=='danRedBall'){
                            danRedBallList.push(item.num)
                        }
                        if(item.type=='tuoRedBall'){
                            tuoRedBallList.push(item.num)
                        }
                        if(item.type=='danBlueBall'){
                            danBlueBallList.push(item.num)
                        }
                        if(item.type=='tuoBlueBall'){
                            tuoBlueBallList.push(item.num)
                        }
                    })
                    sortFn(danRedBallList).forEach(item=>{
                        dantuoballList.push({
                            num:item,
                            type:'danRedBall'
                        })
                    })
                    dantuoballList.push({
                        num:'—',
                        type:'line'
                    })
                    sortFn(tuoRedBallList).forEach(item=>{
                        dantuoballList.push({
                            num:item,
                            type:'tuoRedBall'
                        })
                    })
                    dantuoballList.push({
                        num:'—',
                        type:'line'
                    })
                    sortFn(danBlueBallList).forEach(item=>{
                        dantuoballList.push({
                            num:item,
                            type:'danBlueBall'
                        })
                    })
                    if(danBlueBallList>0){
                        dantuoballList.push({
                            num:'—',
                            type:'line'
                        })
                    }
                    sortFn(tuoBlueBallList).forEach(item=>{
                        dantuoballList.push({
                            num:item,
                            type:'tuoBlueBall'
                        })
                    })
                    ballList = ballList.concat(dantuoballList)
                }
                if(type == 'biaozhun'){
                    let redBallList = []
                    let blueBallList = []
                    Arr.forEach(item=>{
                        if(item.type=='blueBall'){
                            blueBallList.push(item.num)
                        }
                        if(item.type=='redBall'){
                            redBallList.push(item.num)
                        }
                    })
                    sortFn(redBallList).forEach(item=>{
                        biaozhunballList.push({
                            num:item,
                            type:'redBall'
                        })
                    })
                    sortFn(blueBallList).forEach(item=>{
                        biaozhunballList.push({
                            num:item,
                            type:'blueBall'
                        })
                    })
                    ballList = ballList.concat(biaozhunballList)
                }
                return ballList
            },
            //计算总钱
            getBallFn() {
                var that = this
                this.adds.zhuNum = 0
                this.adds.money = 0
                this.conformBallList.forEach(item => {
                    item.ballList = that.sorts(item.ballList,item.ballType)
                    this.adds.zhuNum = this.adds.zhuNum + parseInt(item.msg.zhuNum)
                    this.adds.money = this.adds.money + parseInt(item.msg.money)
                })
            },
            //更新每注信息
            addOne(ckick) {
                this.conformBallList = JSON.parse(sessionStorage.getItem('conformBallList'))
                if(sessionStorage.getItem('adds')!=null){
                    this.adds = JSON.parse(sessionStorage.getItem('adds'))
                }
                if(ckick){
                    this.adds.add = !this.adds.add
                    if (this.adds.add) {
                        this.adds.imgUrl = Selected
                        this.conformBallList.forEach(item => {
                            this.$set(item.msg, 'baseMoney', (parseInt(item.msg.baseMoney) + 1))
                            this.$set(item.msg, 'money', 3*item.msg.zhuNum*item.msg.bei)
                        })
                    } else {
                        this.adds.imgUrl = SelectionBox
                        this.conformBallList.forEach(item => {
                            this.$set(item.msg, 'baseMoney', (parseInt(item.msg.baseMoney) - 1))
                            this.$set(item.msg, 'money', 2*item.msg.zhuNum*item.msg.bei)
                        })
                    }
                }else {
                    if(this.adds.add){
                        this.conformBallList.forEach(item => {
                            if(item.msg.baseMoney%2==0){
                                this.$set(item.msg, 'baseMoney', (parseInt(item.msg.baseMoney) + 1))
                                this.$set(item.msg, 'money', 3*item.msg.zhuNum*item.msg.bei)
                            }
                        })
                    }else {
                        this.conformBallList.forEach(item => {
                            this.$set(item.msg, 'money', 2*item.msg.zhuNum*item.msg.bei)
                        })
                    }
                }
                sessionStorage.setItem('adds', JSON.stringify(this.adds))
                sessionStorage.setItem('conformBallList', JSON.stringify(this.conformBallList))
                this.getBallFn()
            },
            // 头部返回
            goBack() {
                // this.$router.push({
                //     path:'/lottery/daletou/selectnumber'
                // })
                this.$router.go(-1);
            },
            //手动添加
            handAdd() {
                this.routerOpen = false
                this.$router.push({
                    path:"/lottery/daletou/selectnumber",
                })
                //this.$router.go(-1);
            },
            //机选
            machineSelection(type) {
                if (type == '0') {
                    let ballList = []
                    getArrayItems(this.redBallBox, 5).forEach(item => {
                        ballList.push({
                            num: item,
                            type: 'redBall'
                        })
                    })
                    getArrayItems(this.blueBallBox, 2).forEach(item => {
                        ballList.push({
                            num: item,
                            type: 'blueBall',
                        })
                    })
                    this.conformBallList.push({
                        ballList: ballList,
                        ballType: 'biaozhun',
                        msg: {
                            zhuNum: '1',
                            danFn: '单式',
                            bei: this.adds.bei,
                            money: 2,
                            baseMoney: 2
                        }
                    })
                }
                if (type == '1') {
                    for (let i = 0; i < 5; i++) {
                        let ballList = []
                        getArrayItems(this.redBallBox, 5).forEach(item => {
                            ballList.push({
                                num: item,
                                type: 'redBall'
                            })
                        })
                        getArrayItems(this.blueBallBox, 2).forEach(item => {
                            ballList.push({
                                num: item,
                                type: 'blueBall'
                            })
                        })
                        this.conformBallList.push({
                            ballList: ballList,
                            ballType: 'biaozhun',
                            msg: {
                                zhuNum: '1',
                                danFn: '单式',
                                bei: this.adds.bei,
                                money: 2,
                                baseMoney: 2
                            }
                        })
                    }
                }
                sessionStorage.setItem('conformBallList', JSON.stringify(this.conformBallList))
                this.addOne()
            },
            //删除
            delItem(index) {
                this.conformBallList.splice(index, 1)
                if(this.conformBallList.length<1){
                    this.routerOpen = false
                    // this.$router.go(-1);
                    this.$router.push({
                        path:"/lottery/daletou/selectnumber"
                    })
                }
                sessionStorage.setItem('conformBallList', JSON.stringify(this.conformBallList))
                this.getBallFn()
            },
            goSelect(item,index) {
                this.routerOpen = false
                this.adds.itemEditIndex = index
                this.$set(item.msg,'status','edit',)
                sessionStorage.setItem('conformBallList',JSON.stringify(this.conformBallList))
                sessionStorage.setItem('adds',JSON.stringify(this.adds))
                if (item.ballType == 'biaozhun') {
                    sessionStorage.setItem('selectedIndex', '0')
                } else {
                    sessionStorage.setItem('selectedIndex', '1')
                }
                this.$router.push({
                    path: "/lottery/daletou/selectnumber",
                    query: {
                        ballList: item.ballList
                    }
                })
            },
            xySelectedClick(){
                if(this.$refs.xySelected.className=='icon-icon-29 iconfont xySelected'){
                    this.$refs.xySelected.className = 'icon-icon-29 iconfont'
                    this.canPay  = false
                }else{
                    this.canPay  = true
                    this.$refs.xySelected.className = 'icon-icon-29 iconfont xySelected'
                }
            },
            // 选择倍数
            mupClick() {
                this.$store.state.mark_playObj.mark_playBox = true
                this.$store.state.mark_playObj.mark_play = '2'
            },
            confirm(){
                if(this.canPay){
                    Indicator.open()
                    let obj = {
                        betNum: this.adds.zhuNum,
                        bonusId: '',
                        isAppend: this.adds.add?1:0,
                        // lotteryClassifyId: 2,
                        // lotteryPlayClassifyId: this.adds.add?10:9,
                        times: this.adds.bei,
                        orderMoney: this.adds.money,
                        betInfos: saveDtInfo(this.conformBallList)
                    }
                    api.saveBetInfoDlt(obj)
                        .then(res => {
                            if (res.code == 0) {
                                if(isWebview()){
                                    nativeApp({'methodName':'pushPayment','payToken':res.data,'pushUrl':getCsUrl()+'/daletou/programmeDetails'})
                                }else{
                                    this.$router.push({
                                        path: '/freebuy/payment',
                                        query:{
                                            ptk: res.data
                                        }
                                    })
                                }
                            }
                        })
                }else {
                    Toast('请勾选协议！')
                }
            },
            color(c){
                let channelcolor = "#ea5504"
                if(c){
                    if(isWebview()){
                        channelcolor = this.channelObj.color
                    }
                }else{
                    channelcolor = "#c7c7c7"
                }
                return channelcolor;
            }
        },
        computed:{
            bei(){
                return this.$store.state.mark_playObj.mupNum
            },
            channelObj(){
                return this.$store.state.channelObj
            }
        },
        watch: {
            // 加倍
            bei(a,b){
                if(this.num!=1){
                    this.adds.money = 0
                    this.conformBallList.forEach(item => {
                        item.msg.bei = a
                        item.msg.money = a*item.msg.baseMoney*item.msg.zhuNum
                        this.adds.money = this.adds.money + item.msg.money
                    })
                    sessionStorage.setItem('conformBallList', JSON.stringify(this.conformBallList))
                    this.adds.bei = a
                    sessionStorage.setItem('adds', JSON.stringify(this.adds))
                }else {
                    this.num++
                }
            }
        },
        destroyed(){
            this.$store.state.mark_playObj.mupNum = 5
            this.$emit('closeMarkCz')
        },
        beforeRouteLeave(to, from, next) {
            if(to.name == 'selectNumber'&&this.routerOpen){
                MessageBox.confirm('',{
                    title: '温馨提示',
                    message: '确定清空所选号码吗?',
                    closeOnClickModal: false
                }).then(action => {
                    sessionStorage.setItem('conformBallList', JSON.stringify([]))
                    this.adds.bei=1
                    this.adds.add=false
                    this.adds.imgUrl=SelectionBox
                    sessionStorage.setItem('adds', JSON.stringify(this.adds))
                    next()
                }).catch(function () {
                    next(false)
                });
            }else {
                next()
            }
        }
    }
</script>

