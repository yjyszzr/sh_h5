<style scoped lang="scss">
    @import "../assets/css/function.scss";

    .header {
        position: relative;
        height: px2rem(100px);
        line-height: px2rem(100px);
        background-color: #fff;
    }

    .mation p {
        font-size: px2rem(28px);
        color: #a0a0a0;
        span {
            color: #505050;
        }
    }

    .fixedRight {
        position: fixed;
        right: px2rem(20px);
        bottom: px2rem(190px);
        z-index: 200;
        background: #dc3c32;
        padding: px2rem(10px) px2rem(15px);
        font-size: px2rem(24px);
        color: #fff;
        border-radius: px2rem(10px);
        line-height: px2rem(32px);
    }

    /*.mation p*/

    .center {
		margin-bottom: px2rem(20px);
        width: 100%;
        background: #fff;
        ul {
            padding-bottom: px2rem(28px);
            overflow: hidden;
            li {
                width: 25%;
                text-align: center;
                font-size: px2rem(30px);
                margin-top: px2rem(32px);
                float: left;
                position: relative;
                .entry_status {
                    position: absolute;
                    top: px2rem(-12px);
                    right: px2rem(5px);
                    width: px2rem(60px);
                }
                .lottery {
                    width: px2rem(64px);
                    top: px2rem(-7px);
                    right: px2rem(0px);
                }
                p {
                    margin-top: px2rem(16px);
                    font-size: px2rem(28px);
                    color: #505050;
                }
                .subTitle {
                    font-size: px2rem(20px);
                }
            }
            li:nth-child(5),
            li:nth-child(6),
            li:nth-child(7),
            li:nth-child(8) {
                margin-top: px2rem(52px);
            }
            .entry_icon {
                width: px2rem(93px);
                margin: 0 auto;
            }
        }
    }

    .scroll-wrap {
        background: #fff;
        height: px2rem(61px);
        padding-left: px2rem(30px);
        display: flex;
        align-items: center;
        overflow: hidden;
        position: relative;
        i {
            color: #dc3c32;
            vertical-align: middle;
            font-size: px2rem(30px);
            display: inline-block;
        }
        p {
            font-size: px2rem(28px);
            color: #a0a0a0;
        }
        .scroll-content {
            position: absolute;
            transition: top 0.5s;
            left: px2rem(72px);
        }
        .scroll-content li {
            text-align: left;
            font-size: px2rem(28px);
            color: #666;
            height: px2rem(61px);
            display: flex;
            align-items: center;
            overflow: hidden;
        }
    }

    .information {
        background: #fff;
        padding: 0 px2rem(20px);
        ul {
            li {
                width: 100%;
            }
        }
    }

    .downDrop {
        background: rgb(59, 60, 61);
        height: px2rem(88px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 px2rem(30px);
        .downLeft {
            display: flex;
            align-items: center;
            img {
                width: px2rem(48px);
                margin-right: px2rem(20px);
            }
            span {
                color: white;
                font-size: px2rem(28px);
            }
        }
        .downRight {
            padding: px2rem(5px) px2rem(15px);
            border: 1px solid #fff;
            box-sizing: border-box;
            border-radius: px2rem(5px);
            span {
                color: #fff;
                font-size: px2rem(26px);
                a{
                    color: #fff;
                }
            }
        }
    }
</style>
<!--首页-->
<template>
    <div class="wrap">
        <div class="downDrop" v-show="version!='zx'">
            <div class="downLeft">
                <!-- <img src="../assets/img/downIocn.png" alt=""> -->
                <span>下载{{$store.state.channelObj.channelNmae}}APP 购彩更轻松</span>
            </div>
            <!-- 下载不同渠道安卓包 -->
            <div class="downRight">
                <span v-if="detect=='ios'">
                  <a :href="isoDowUrl">立即下载</a>
                </span>
                <span v-else>
                  <a href="https://szcq-apk.oss-cn-beijing.aliyuncs.com/shenghe_c11110_1.2.0.apk">立即下载</a>
                </span>
            </div>
        </div>
        <!-- 桌面引导 -->
        <div v-if='detect=="ios"&&version!="zx"' class="fixedRight" @click="shortClick()">
            <p>放到</p>
            <p>桌面</p>
        </div>
        <v-slider :bannerList='bannerList' v-if="bannerList.length!=0"></v-slider>
        <!--首页-->
        <div class="index_center">
            <div v-if="y_Carousel.length>0&&$store.state.turnOn!=0" class="carousel" style="margin-top: 0.24rem;">
                <div class="scroll-wrap">
                    <i class="iconfont icon-icon-"></i>
                    <!-- <p v-if='show'>温馨提示:理性投注,长跟长红</p> -->
                    <ul class="scroll-content" :style="{top}" v-if='hide'>
                        <li v-for="(data,item) in y_Carousel" :key='item' v-html="carouselMoney(data)">
                        </li>
                    </ul>
                </div>
            </div>
            <v-activity v-show="$store.state.turnOn!=0" :activity='activity'></v-activity>
            <!--<router-link to='http://localhost:3000/daletou/selectnum/selectnumber'>啦啦啦啦啦(测试入口)</router-link>-->
            <div class="section center" v-show="$store.state.turnOn!=0">
                <ul>
                    <li v-for='(item,i) in dlPlay' :key='i' @click="goFreebuy(item.redirectUrl,item)">
                        <img :src="item.lotteryImg" class="entry_icon">
                        <p>{{item.lotteryName}}</p>
                        <div class="subTitle" :style="{'color':item.status=='0'?'#dc3c32':'#9f9f9f'}">
                            {{item.subTitle}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--资讯-->
        <div class="information">
            <ul>
                <li>
                    <v-informal :zxList='zxList'></v-informal>
                </li>
                <div class="triple" v-show="trFlag">
                    <v-loading></v-loading>&nbsp;<span style="font-size:0.34rem;">正在加载...</span>
                </div>
                <div class="cxLoad" v-show="cxLoadFlag" @click="cxLoadClick()">
                    加载失败,点击重试
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
    // import http from '../api/http'
    import api from "../fetch/api";
    import {Toast, Indicator} from "mint-ui";
    import {getUrlStr, nativeApp} from '../util/common'
    import silder from "./index/lunbo";
    import activity from "./index/activity";
    import informal from "./public/informal/informalList";
    import Loading from './public/loading/loading.vue'
    import {detect} from '../util/common.js'
	import { version } from '../util/versionSwitch'

    export default {
        name: "index",
        data() {
            return {
                isoDowUrl:'',//ios下载地址
                bannerList: [], //banner
                activity: {}, //活动
                y_Carousel: [], //中奖信息
                dlPlay: [],
                activeIndex: 0,
                show: true,
                hide: false,
                page: 1,
                zxList: [],
                zxObj: {},
                trFlag: true,
                isbool: true,
                cxLoadFlag: false,
                detect: '',   //判断设备信息
				version: version
            };
        },
        beforeCreate() {
            Indicator.open();
        },
        components: {
            "v-slider": silder,
            "v-activity": activity,
            "v-informal": informal,
            "v-loading": Loading
        },
        computed: {
            top() {
                return -this.activeIndex * 0.81333 + "rem";
            }
        },
        methods: {
            shortClick() {
                //location.href = 'http://www.baidu.com'
                this.$store.commit('MARKSHORTCUT', true)
            },
            goFreebuy(url, s) {
                if (s.status == '1') {
                    Toast(s.statusReason)
                    return false;
                }
                this.$store.state.matchObj = {};
                this.$store.state.mark_playObj.bfIdSaveMapFlag = 0;
                this.$store.state.mark_playObj.bfIdSaveMap = {};
                let go_id = getUrlStr('id', url)
                if (go_id == '1') {
                    this.$store.commit('FREEBUYID', '6')
                    this.$router.push({
                        path: "/lottery/freebuy/singleNote"
                    });
                } else if (go_id == '2') {
                    this.$router.push({
                        path: "/lottery/daletou/selectnumber"
                    });
                }
            },
            //获取大厅数据
            async getHallData(){
                let res = await api.getHallData({});
                if (res.code == 0) {
                        this.bannerList = res.data.dlHallDTO.navBanners;
                        this.activity = res.data.dlHallDTO.activity;
                        this.y_Carousel = res.data.dlHallDTO.winningMsgs;
                        this.dlPlay = res.data.dlHallDTO.lotteryClassifys;
                        if (this.y_Carousel.length == 0) {
                            this.show = true;
                            this.hide = false;
                        } else {
                            this.show = false;
                            this.hide = true;
                            setInterval(_ => {
                                if (this.activeIndex < this.y_Carousel.length - 1) {
                                    this.activeIndex += 1;
                                } else {
                                    this.activeIndex = 0;
                                }
                            }, 3000);
                        }
                }
            },
            fetchData() {
                let data = {
                    page: this.page,
                    size: 20
                };
                api
                    .dllist(data)
                    .then(res => {
                        if (res.code == 0) {
                            //console.log(res);
                            this.zxObj = res.data;
                            if (this.page == 1) {
                                this.zxList = this.zxList.concat(res.data.list);
                                this.trFlag = false;
                            } else {
                                setTimeout(() => {
                                    this.trFlag = false;
                                    this.isbool = true;
                                    this.zxList = this.zxList.concat(res.data.list);
                                }, 800);
                            }
                        }
                    })
                    .catch(err => {
                        setTimeout(() => {
                            this.trFlag = false;
                            this.cxLoadFlag = true;
                        }, 800);
                    });
            },
            async init(){
                await this.getHallData();
                this.fetchData();
            },
            cxLoadClick() {
                this.trFlag = true;
                this.cxLoadFlag = false;
                this.fetchData();
            },
            carouselMoney(c) {
                return (
                    c.winningMsg +
                    '<b style="color:#dc3c32;font-weight:400;">' +
                    c.winningMoney +
                    "</b>元"
                );
            },
            handleScroll(e) {
                if (
                    document.querySelector("#content").scrollHeight -
                    document.querySelector("#content").clientHeight -
                    document.querySelector("#content").scrollTop <=
                    0 &&
                    this.isbool == true
                ) {
                    if (this.zxObj.isLastPage == "false") {
                        this.page++;
                        this.fetchData();
                        this.trFlag = true;
                        this.isbool = false;
                    }
                }
            },
            goDownLoad() {
                // this.$router.push({
                //     path: "/activity/down/cxm?ct=2&fr=cxm_h5home"
                // });
            }
        },
        mounted() {
                this.detect = detect()
                // location.href = 'caixm://caixiaomi.net'
                localStorage.removeItem("tab");
                document
                    .querySelector("#content")
                    .addEventListener("scroll", this.handleScroll);
                this.init();
                api.querySysConfig({businessId:'75'}).then(res=>{
                    if(res.code==='0'){
                        this.isoDowUrl=res.data.valueTxt
                    }
                })
        },
        activated() {
            document.getElementById("content").scrollTop = this.$root.consultScrolltop;
        },
        destroyed() {
            this.$store.commit('MARKSHORTCUT', false)
        }
    };
</script>