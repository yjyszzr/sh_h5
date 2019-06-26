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
                                <span class="arrow_kefu float_right" style="color: #ea5504;">￥{{payment.orderMoney}}</span>
                                <span class="message">订单金额</span>
                            </div>
                        </a>
                        <a>
                            <div>
                                <span class="arrow_kefu float_right">-￥{{payment.surplus}}</span>
                                <span class="message">余额抵扣</span>
                            </div>
                        </a>
                        <a>
                            <div>
                                <span class="arrow_kefu float_right" @click='yhClick()' v-show="payment.bonusList&&payment.bonusList.length>0">-￥{{payment.bonusAmount}}<i class="iconfont icon-icon-14"></i></span>
                                <span class="arrow_kefu float_right" v-show="payment.bonusList&&payment.bonusList.length==0">暂无优惠券</span>
                                <span class="message">优惠劵抵扣</span>
                            </div>
                        </a>
                        <a>
                            <div>
                                <span class="arrow_kefu float_right" style="color: #ea5504;">￥{{payment.thirdPartyPaid}}</span>
                                <span class="message">还需支付</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </section>
            <section class="section" v-if="Number(payment.thirdPartyPaid)>0">
                <p class="mode">支付方式</p>
                <ul class="msg_list">
                    <li @click="wxClick($event,i,item)" v-for="(item,i) in allPaymentList" :key='i'>
                        <a href="javascript:void(0);">
                            <div>
                                <img :src="item.payImg">
                                <span class="arrow_kefu float_right">
                                <i ref="wxSelected" class="iconfont icon-icon-29" :class="item.payCode==payCode?'wxSelected':''"></i>
                            </span>
                                <span class="message">{{item.payName}}</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </section>
        </div>
        <button class="paymentBtn" @click="payBtn()">
            确认支付
        </button>
    </div>
</template>
<script src='./script.js'>
    // import http from '../api/http'

</script>