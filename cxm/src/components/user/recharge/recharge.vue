<style lang='scss' scoped src='./style.scss'>

</style>


<!--我的-->
<template>
    <div class="wrap" style="padding-bottom: 0.2rem;">
        <!--<iframe v-bind:src="testUrl" v-bind:style="{display: testUrlDisplay}" style="z-index: 999999;width: 100%;height: 600px;"></iframe>-->
        <span class="head">小秘提示：充值金额可购彩但不能提现，中奖金额可提现</span>
        <div style="margin-top:0.5rem;" class="section current clearfix">
            <p>当前账号：{{userInfo.mobile}} <br/>当前余额：{{userInfo.totalMoney}}元</p>
        </div>
        <section class="section amount">
            <p>充值金额</p>
            <!--<div class="rote" v-if="recharge_val>=10&&czobj.isHaveRechargeAct=='1'"><span v-if="czobj.rechargeUserDTO.oldUserBz=='1'">最高</span>送{{cznum}}元</div>-->
            <div class="rote" v-if='inputDisabled'>{{activityDescribe}}</div>
            <input v-model="recharge_val" :disabled="inputDisabled"  onKeyPress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;" onKeyUp="this.value=this.value.replace(/\D/g,'')" type="tel" class="money" placeholder="请输入整数的充值金额"/>
            <ul>
                <li v-for="(item,i) in list_num" :key='i' @click='changenum(item)'>{{item}}</li>
            </ul>
        </section>
        <!-- <a href="weixin://wxpay/bizpayurl?pr=ULAxnef" style="font-size:100px;">ccc</a> -->
        <section class="section wechat">
            <p>支付方式</p>
            <ul class="msg_list">
                <li @click="wxClick($event,i,item)" v-for="(item,i) in allPaymentList" :key='i'>
                        <a href="javascript:void(0);">
                            <div>
                                <img :src="item.payImg">
                                <span class="arrow_kefu float_right">
                                <i ref="wxSelected" class="iconfont icon-icon-29" :class="item.payCode==payCode?'wxSelected':''"></i>
                            </span>
                                <span class="message"><b>{{item.payName}}</b><b>充值前请确认竞彩足球是否销售</b></span>
                            </div>
                        </a>
                </li>
            </ul>
        </section>
        <section class="button" @click="determine()">
            <a class="determine">立即支付</a>
        </section>
        <div class="prompt"></div>
    </div>
</template>

<script src='./script.js'>
    // import http from '../api/http'

</script>

