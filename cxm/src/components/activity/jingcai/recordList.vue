<template>
    <div class="record-list" :style="{width:'100%'}">
        <div class="body">
            <ul class="ul-list" v-if="historyList.length>0">
                <li @click="goMyRecord(item)" v-for="(item,index) in historyList" :key=index>
                    <p class="left-p">{{item.period}} <span class="img-new"><img v-if="index==0" src="./images/new.png" alt=""></span> </p>
                    <p class="right-p">查看竞猜详情 > </p>
                </li>
            </ul>
            <div v-else class="not-canjia">
                <div class="img-box">
                    <img src="./images/nocup.png" alt="">
                </div>
                <p class="text-one">很抱歉，您还未参加过竞猜</p>
                <!--<p @click="nowCanjia()" class="now-canjia">立即参加</p>-->
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../../../assets/css/function.scss";
    .record-list {
        background: url("./images/base.jpg") no-repeat center;
        background-size: 100% auto;
        height: 100%;
        overflow: auto;
        .body {
            height: auto;
            .ul-list{
                width: 100%;
                padding: 0 px2rem(32px);
                box-sizing: border-box;
                li{
                    color: #ffffff;
                    font-size: px2rem(30px);
                    overflow: hidden;
                    border-bottom: 1px solid #ffffff;
                    line-height: px2rem(100px);
                    .left-p{
                        float: left;
                        position: relative;
                        .img-new{
                            display: inline-block;
                            height: px2rem(50px);
                            width: px2rem(100px);
                            position: absolute;
                            right: px2rem(-100px);
                            top: px2rem(20px);
                            img{
                                width: 100%;
                            }
                        }
                    }
                    .right-p{
                        float: right;
                    }
                }
            }
            .not-canjia{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-size: px2rem(36px);
                color: #f8d15c;
                overflow: hidden;
                padding-top: px2rem(300px);
                .img-box{
                    height: px2rem(150px);
                    width: px2rem(150px);
                    overflow: hidden;
                    img{
                        width: 100%;
                    }
                }
                p{
                    margin-top: px2rem(50px);
                }
                .now-canjia{
                    color: #ea5504;
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
                historyList:[],
                matchId:this.$route.query.matchId,//赛事ID
            }
        },
        created(){
          this.getMyhistoryList()
        },
        methods: {
            //获取我的历史记录
            getMyhistoryList(){
                var that = this
                let data = {
                    str:that.matchId
                }
                api.userAnswersList(data)
                    .then(res => {
                        if (res.code == 0) {
                            this.historyList = res.data
                        }
                    })
            },
            //去详情页
            goMyRecord(item){
                this.$router.push({
                    path:"/activity/jingcai",
                    query:{
                        matchId:item.matchId,
                        showtitle: '1'
                    }
                })
            },
            nowCanjia(){
                this.$router.go(-1)
            }
        }
    }
</script>