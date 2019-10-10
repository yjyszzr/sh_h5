<style lang='scss' scoped src='./style.scss'>

</style>


<!--我的-->
<template>
    <div class="user">
        <div class="center">
            <div class="portrait clearfix">
                <div class="people">
                    <img src="../../../assets/img/portrait.png" v-if="userInfo.headimg==''">
                    <img :src="userInfo.headimg" alt="" v-if="userInfo.headimg!=''">
                </div>
                <div class="por-right">
                    <span>{{userInfo.mobile}}</span>
                    <b v-show="$store.state.turnOn!=0" class="certified" v-if='userInfo.isReal=="1"'></b>
                    <p v-show="$store.state.turnOn!=0" v-if='userInfo.isReal=="0"' @click='gorz()'>您还未实名认证，尽快实名认证</p>
                </div>
            </div>
            <div class="money clearfix" v-show="$store.state.turnOn!=0">
                <div class="left" v-show="userInfo.recharegeTurnOn=='1'">
                    <span><b>{{userInfo.totalMoney}}</b><i>元</i></span>
                    <p>账户余额</p>
                </div>
                <div class="left" v-show="userInfo.recharegeTurnOn=='1'">
                    <span><b>{{userInfo.userMoney}}</b><i>元</i></span>
                    <p>可提现余额</p>
                </div>
            </div>
            <div class="nav" v-show="$store.state.turnOn!=0">
                <a @click="goRecharge()" v-show="userInfo.recharegeTurnOn=='1'">充值</a>
                <a @click="goWithdraw(userInfo.isReal)" v-show="userInfo.recharegeTurnOn=='1'">提现</a>
            </div>
        </div>
        <div class="section" v-show="$store.state.turnOn!=0">
            <ul class="msg_list">
                <li>
                    <router-link to="/user/record">
                        <div>
                            <i class="iconfont icon-icon-1"></i>
                            <span class="arrow_right float_right"></span>
                            <span class="message">投注记录</span>
                        </div>
                    </router-link>
                    <router-link to='/user/account' v-show="userInfo.recharegeTurnOn=='1'">
                        <div>
                            <i class="iconfont icon-icon-2"></i>
                            <span class="arrow_right float_right"></span>
                            <span class="message">账户明细</span>
                        </div>
                    </router-link>
                    <router-link to='/user/detail'>
                        <div>
                            <i class="iconfont icon-icon-3"></i>
                            <span class="arrow_right float_right"></span>
                            <span style="float:right;height:1.17333rem;line-height:1.19rem;color:#dc3c32;">{{Number(userInfo.bonusNumber)>0?`${userInfo.bonusNumber}张优惠券可用`:''}}</span>
                            <span class="message">我的卡券</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="section">
            <ul class="msg_list tug" style="min-height: 0">
                <li v-for='(item,i) in userInfo.activityDTOList' :key="i">
                    <router-link to="/activity/tuiguang">
                        <div>
                            <p>
                                <img :src="item.icon" alt="">
                                <span class="message">{{item.title}}</span>
                            </p>
                            <span class="arrow_right"></span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="section">
            <ul class="msg_list">
                <li>
                    <router-link to='/user/message' v-show="$store.state.turnOn!=0">
                        <div>
                            <i class="iconfont icon-icon-36"></i>
                            <span class="arrow_right float_right"></span>
                            <span class="message">消息中心</span>
                        </div>
                    </router-link>
                    <router-link to='/user/collection'>
                        <div>
                            <i class="iconfont icon-icon-34"></i>
                            <span class="arrow_right float_right"></span>
                            <span class="message">我的收藏</span>
                        </div>
                    </router-link>
                    <router-link to="/user/help">
                        <div>
                            <i class="iconfont icon-icon-7"></i>
                            <span class="arrow_right float_right"></span>
                            <span class="message">帮助中心</span>
                        </div>
                    </router-link>
                    <!-- <a href="tel:400-012-6600">
                        <div>
                            <i class="iconfont icon-icon-4"></i>
                            <span class="arrow_kefu float_right">400-012-6600 </span>
                            <span class="message">联系客服</span>
                        </div>
                    </a> -->
                    <a href="https://www.sobot.com/chat/h5/index.html?sysNum=1a549fa1ac1b4c0f9eeda9953f62b9b2&titleFlag=3">
                        <div>
                            <img src="./img/zaiixiankefu@3x.png" alt="">
                            <span class="arrow_right float_right"></span>
                            <span class="message">在线客服</span>
                        </div>
                    </a>
                    <router-link to='/user/about'>
                        <div>
                            <i class="iconfont icon-icon-5"></i>
                            <span class="arrow_right float_right"></span>
                            <span class="message">关于我们</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="button" @click="loginout()">
            退出登录
        </div>
    </div>
</template>

<script src='./script.js'>
    // import http from '../api/http'

</script>

