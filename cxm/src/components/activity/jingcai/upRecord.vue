<template>
    <div class="Uprecord" :style="{width:'100%'}">
        <div class="main">
            <div v-if="login">
                <!--参与竞猜-->
                <div v-if="data.participateOrNot=='1'">
                    <div class="title-box">
                        <div class="left-box">
                            <p class="money"><span>{{data.bonusPool}}</span>元</p>
                            <p class="money-text">奖池金额</p>
                        </div>
                        <p class="line"></p>
                        <div v-if="data.numOfPeople!='0'" class="right-box">
                            <p class="money"><span>{{data.reward}}</span>元</p>
                            <p class="money-text">获奖单注奖金</p>
                        </div>
                        <div v-if="data.numOfPeople =='0'" class="right-box">
                            <p class="money"><span>未中奖</span></p>
                            <p class="money-text">获奖单注奖金</p>
                        </div>
                    </div>
                    <!--参与未中奖-->
                    <div v-if="data.getAwardOrNot=='0'" class="body-box">
                        <div class="img-box">
                            <img src="./images/nocup.png" alt="">
                        </div>
                        <p class="text-one">很遗憾，您本期未中奖！</p>
                        <!--<p class="text-tow">恭喜你获得奖金恭喜你获得奖金恭喜你获得奖金恭喜你获得奖金恭喜你获得奖金恭喜你获得奖金 <span>200</span> 元</p>-->
                    </div>
                    <!--参与并中奖-->
                    <div v-if="data.getAwardOrNot=='1'" class="body-box">
                        <div class="img-box">
                            <img src="./images/cup.png" alt="">
                        </div>
                        <p class="text-one">恭喜你获得奖金 <span>{{data.reward}}</span> 元！</p>
                        <!--<p class="text-tow">恭喜你获得奖金恭喜你获得奖金恭喜你获得奖金恭喜你获得奖金恭喜你获得奖金恭喜你获得奖金 <span>200</span> 元</p>-->
                    </div>
                </div>
                <!--未参与竞猜-->
                <div class="no" v-if="data.participateOrNot=='0'">
                    <div class="title-box">
                        <div class="left-box">
                            <p class="money"><span>{{data.bonusPool}}</span>元</p>
                            <p class="money-text">奖池金额</p>
                        </div>
                        <p class="line"></p>
                        <div v-if="data.numOfPeople !='0'" class="right-box">
                            <p class="money"><span>{{data.reward}}</span>元</p>
                            <p class="money-text">获奖单注奖金</p>
                        </div>
                        <div v-if="data.numOfPeople =='0'" class="right-box">
                            <p class="money"><span>未中奖</span></p>
                            <p class="money-text">获奖单注奖金</p>
                        </div>
                    </div>
                    <div class="body-box">
                        <div class="img-box">
                            <img src="./images/nocup.png" alt="">
                        </div>
                        <p class="text-one">很抱歉，您本期未参与竞猜！</p>
                    </div>
                </div>
            </div>
            <div v-if="!login">
                <div>
                    <div class="title-box">
                        <div class="left-box">
                            <p class="money"><span>{{data.bonusPool}}</span>元</p>
                            <p class="money-text">上期奖池金额</p>
                        </div>
                        <p class="line"></p>
                        <div v-if="data.numOfPeople =='0'" class="right-box">
                            <p class="money"><span>未中奖</span></p>
                            <p class="money-text">获奖单注奖金</p>
                        </div>
                        <div v-if="data.numOfPeople !='0'" class="right-box">
                            <p class="money"><span>{{data.reward}}</span>元</p>
                            <p class="money-text">获奖单注奖金</p>
                        </div>
                    </div>
                    <div v-if="data.numOfPeople !='0'" class="body-box">
                        <div class="img-box">
                            <img src="./images/cup.png" alt="">
                        </div>
                        <p class="text-one">恭喜 <span>{{data.numOfPeople}}</span> 位小秘用户中奖！</p>
                    </div>
                    <div v-if="data.numOfPeople =='0'" class="body-box">
                        <div class="img-box">
                            <img src="./images/nocup.png" alt="">
                        </div>
                        <p class="text-one">本期暂未有人中奖！</p>
                        <p class="text-tow"> 奖池金额已转入下一期赛事快去参与竞猜，祝您掏空奖池！</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../../../assets/css/function.scss";

    .Uprecord {
        background: url("./images/base.jpg") no-repeat center;
        background-size: 100% auto;
        height: 100%;
        overflow: auto;
        .main {
            height: auto;
            .title-box {
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid #ffffff;
                height: px2rem(234px);
                .money{
                    color:#f8d15c;
                    font-size: px2rem(30px);
                    span{
                        font-size: px2rem(48px);
                    }
                }
                .money-text{
                    color: #FFFFFF;
                    font-size: px2rem(26px);
                }
                .left-box{
                    width: 49%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }
                .line{
                    height: 100%;
                    border-right: 1px solid #ffffff;
                }
                .right-box{
                    width: 49%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }
            }
            .body-box{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .img-box{
                    margin-top: px2rem(200px);
                    height: px2rem(150px);
                    width: px2rem(150px);
                    overflow: hidden;
                    img{
                        width: 100%;
                    }
                }
                .text-one{
                    margin-top: px2rem(50px);
                    font-size: px2rem(36px);
                    color: #f8d15c;
                }
                .text-tow{
                    text-align: center;
                    width: px2rem(450px);
                    margin-top: px2rem(15px);
                    font-size: px2rem(18px);
                    color: #ffffff;
                }
            }
        }
    }
</style>
<script>
    import api from '../../../fetch/api'
    import {Indicator} from 'mint-ui'
    export default {
        name: "jingcai",
        beforeCreate() {
            Indicator.open()
        },
        data() {
            return {
                login:true,
                matchId:this.$route.query.matchId,
                data:{},
                token:localStorage.getItem('token')
            }
        },
        created(){
            if(localStorage.getItem('token')==null||localStorage.getItem('token')=='Error'){
                this.login = false
            }else{
                this.login = true
            }
            this.getistoryDetil()
        },
        methods: {
            //获取竞猜详情
            getistoryDetil(){
                let data = {
                    matchId:this.matchId
                }
                api.beforePeriodNote(data)
                    .then(res => {
                        if (res.code == 0) {
                            this.data = res.data
                        }
                    })
            }
        }
    }
</script>