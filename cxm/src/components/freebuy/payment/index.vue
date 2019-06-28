<style lang='scss' src='./style.scss'>
</style>
<template>
  <div class="wrap payment">
    <div class="j_sent">
      <section class="section">
        <ul class="msg_list paymentdetail">
          <li>
            <a>
              <div>
                <span class="arrow_kefu float_right" style="color: #dc3c32;">{{payment.orderMoney}}元</span>
                <span class="message">订单金额</span>
              </div>
            </a>
            <a>
              <div>
                <span class="arrow_kefu float_right">-{{payment.surplus}}元</span>
                <span class="message">余额抵扣</span>
              </div>
            </a>
            <a>
              <div>
                <span
                  class="arrow_kefu float_right"
                  @click="yhClick()"
                  v-if="payment.bonusList&&payment.bonusList.length>0"
                >
                  <b v-show='Number(payment.bonusAmount)<=0' style="color:#dc3c32;font-weight:400;">{{payment.bonusList.length}}张可用优惠券</b>
                  <b v-show='Number(payment.bonusAmount)>0'  style="color:#dc3c32;font-weight:400;">{{bouns_rtn(payment)}}元优惠券 -{{payment.bonusAmount}}元</b>
                  <i class="iconfont icon-icon-14"></i>
                </span>
                <span
                  class="arrow_kefu float_right"
                  v-if="payment.bonusList&&payment.bonusList.length==0"
                >暂无优惠券</span>
                <span class="message">优惠劵抵扣</span>
              </div>
            </a>
            <a v-if="Number(payment.thirdPartyPaid)>0">
              <div>
                <span
                  class="arrow_kefu float_right"
                  style="color: #dc3c32;"
                >{{payment.thirdPartyPaid}}元</span>
                <span class="message">还需支付</span>
              </div>
            </a>
          </li>
        </ul>
      </section>
      <section class="section" v-if="Number(payment.thirdPartyPaid)>0">
        <p class="mode">支付方式</p>
        <ul class="msg_list">
          <li @click="wxClick($event,i,item)" v-for="(item,i) in allPaymentList" :key="i">
            <a href="javascript:void(0);">
              <div>
                <img :src="item.payImg">
                <span class="arrow_kefu float_right">
                  <i
                    ref="wxSelected"
                    class="iconfont icon-icon-29"
                    :class="item.payCode==payCode?'wxSelected':''"
                  ></i>
                </span>
                <span class="nr">
                      <b>{{item.payName}}</b>
                      <b>{{item.payDesc}}</b>
                    </span>
              </div>
            </a>
          </li>
        </ul>
      </section>
      <div class="warn_pay" v-show="Number(payment.thirdPartyPaid)>0&&payCode=='app_offline'">注:您的可用余额不足，请完成账户充值后下单</div>
    </div>
    <button class="paymentBtn" @click="payBtn()">{{payCode=='app_offline'&&Number(payment.thirdPartyPaid)>0?'去充值':'确认支付'}}</button>
  </div>
</template>
<script src='./script.js'>
// import http from '../api/http'
</script>