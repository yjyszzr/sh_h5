<template>
    <div class="rechange-activity">
        <p class="activity-describe" @click="popupVisible=!popupVisible">活动规则</p>
        <img  class="title-img" src="./image/rechange1.jpg" alt="领取活动资格">
        <div class="main-body">
            <p class="zige-btn" @click="getActivity()"><img src="./image/btnBgm.png" alt="领取活动资格"></p>
            <p class="describe">注：先领取资格充值才能获得红包，每次只能选择一种充值额度</p>
            <div class="contents">
                <ul class="item-ul">
                    <li class="item-li" v-for="(item,index) in rechargeCardList" :key=index>
                        <div class="left-mes">
                            <p>单笔充值</p>
                            <p>{{item.realValue}}元</p>
                        </div>
                        <p class="center-mes">{{item.description}}</p>
                        <p class="reChang-btn" @click="searchActivity(item)"><img src="./image/nowbtn.png" alt="立即充值"></p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="describe">
            <mt-popup
                    v-model="popupVisible">
                <div class="describe-box">
                    <p class="title-pop">活动说明</p>
                    <div class="describe-mes">
                        <p>1、本活动时间为即日起至X月X日X时，具体使用范围以红包券显示为准，请至个人中心“我的卡券”中查看。</p>
                        <p>2、只有通过活动页面充值对应金额，才能参与充值送红包活动。</p>
                        <p>3、用户只能在活动页面领取活动资格后，才能参与充值活动。<p>
                        <p>4、参与活动的充值金额，仅限购彩使用，不可提现，中奖奖金可以提现。</p>
                        <p>5、本活动最终解释权归平台所有，如有疑问请拨打客服电话：400-012-6600</p>
                    </div>
                </div>
            </mt-popup>
        </div>
    </div>
</template>

<script>
    import {means,nativeApp} from '../../../util/common'
    import api from '../../../fetch/api'
    import { Popup,Toast,Indicator} from 'mint-ui';
    export default {
        name: "rechange-activity",
        data(){
            return{
                popupVisible:false,//弹窗
                packet:{},
                rechargeCardList:[],
                activityOwn:'',//活动资格 是否有资格:0-代表无资格 1-代表有资格
                token: '',
                login: this.$route.query.isLogin,
            }
        },
        created() {
            let that = this
            window.actionMessage = (arg) => {
                if(JSON.parse(arg).token!==''){
                    that.token = JSON.parse(arg).token
                    localStorage.setItem('token', JSON.parse(arg).token)
                }
            }
            this.getList()
        },
        methods:{
            //获取列表
            getList(){
                let data = {
                    pageNum:1,
                    pageSize:10
                }
                api.toRechange(data)
                    .then(res => {
                        if (res.code == 0) {
                            this.packet = res.data
                            this.rechargeCardList = res.data.rechargeCardList
                        }
                    })
            },
            //查询活动资格
            searchActivity(item){
                Indicator.open()
                var that = this
                let data = {
                    act_id: "3",
                    act_type: "1"
                }
                api.queryActQF(data)
                    .then(res => {
                        if (res.code == 0) {
                           that.activityOwn = res.data.qfRst
                            if(res.data.qfRst=='1'){
                                if(this.$route.query.cfrom == 'app'){
                                    let price = {"price":item.realValue}
                                    means(price).paydata
                                    location.href="/user/recharge?cxmxc=scm&type=11&extparam=paydata"
                                }else{
                                    this.$router.push({
                                        path: '/user/recharge',
                                        query: {
                                            'price': item.realValue,
                                            'description': item.description
                                        },
                                        replace: false
                                    })
                                }
                            }else {
                                Toast('请先领取资格后在充值！')
                            }
                        }
                    })
            },
            //领取活动资格get
            getActivity(){
                if(this.$route.query.cfrom=='app'){
                    if(this.login=='0'&&this.token==''){
                        location.href = 'http://m.caixiaomi.net?cxmxc=scm&type=5&usinfo=1'
                    }else{
                        var that = this
                        if(this.activityOwn=='1'){
                            Toast('您已有资格享受活动，快去充值吧！')
                        }else {
                            let data = {
                                act_id: "3",
                                act_type: "1"
                            }
                            api.reaceiveActQF(data)
                                .then(res => {
                                    if (res.code == '301034') {
                                        that.activityOwn='1'
                                    }else if(res.code == '0'){
                                        Toast(res.msg)
                                    }
                                })
                        }
                    }
                }else{
                    if(localStorage.getItem('token')){
                        var that = this
                        if(this.activityOwn=='1'){
                            Toast('您已有资格享受活动，快去充值吧！')
                        }else {
                            let data = {
                                act_id: "3",
                                act_type: "1"
                            }
                            api.reaceiveActQF(data)
                                .then(res => {
                                    if (res.code == '301034') {
                                        that.activityOwn='1'
                                    }else if(res.code == '0'){
                                        Toast(res.msg)
                                    }
                                })
                        }
                    }else{
                        this.$router.push({
                            path: '/user/sms'
                        })
                    }
                }

            },
        },
        mounted(){
            nativeApp({'methodName':'showTitle','title':'充值送红包'})
            means('充值送红包').isTitle
        },
    }
</script>

<style scoped lang="scss">
    @import "../../../assets/css/function.scss";
    .rechange-activity{
        min-height: 100%;
        width: 100%;
        bottom: px2rem(50px);
        background-color: #59831f;
        .describe{
            .mint-popup{
                border-radius: 5px;
                overflow: hidden;
            }
            .describe-box{
                padding: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .title-pop{
                    font-size: 16px;
                    font-weight: 700;
                    line-height: 30px;
                }
                .describe-mes{
                    width: px2rem(500px);
                    line-height: 16px;
                    p{
                        line-height: 20px;
                    }
                }
            }
        }

        .activity-describe{
            border-radius: 20px 0 0 20px;
            background: #ffffff;
            line-height: 20px;
            padding-left: 10px;
            width: 55px;
            color: #505050;
            font-size: 12px;
            position: absolute;
            right: 0;
            top: 10px;
        }
        .title-img{
            width: 100%;
        }
        .main-body{

            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .zige-btn{
               width: 50%;
                height: px2rem(67px);
                img{
                    width: 100%;
                }
            }
            .describe{
                margin-top: px2rem(30px);
                color: #ffffff;
                font-size: 12px;
            }
            .contents{
                margin-bottom: px2rem(60px);
                margin-top: 30px;
                width: 98%;
                box-sizing: border-box;
                background-color: #81ae37;
                border-radius: 5px;
                padding:px2rem(20px) px2rem(10px);
                .item-ul{
                    .item-li{
                        box-sizing: border-box;
                        padding: 0 px2rem(15px) 0 px2rem(25px);
                        height: px2rem(110px);
                        background: url("./image/itemBgm.png") center no-repeat;
                        background-size: 100%;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        .reChang-btn{
                            height: px2rem(80px);
                            img{
                                height: 100%;
                            }
                        }
                        .left-mes{
                            display: flex;
                            align-items: center;
                            flex-direction:column ;

                            p:nth-child(1){
                                color: #AA050F;
                                font-size:12px ;
                            }
                            p:nth-child(2){
                                color: #8B0301;
                                font-size:14px ;
                            }
                        }
                        .center-mes{
                            color: #543700;
                            font-size: px2rem(40px);
                        }
                    }
                }
            }
        }
    }

</style>