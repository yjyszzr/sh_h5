<style lang='scss' src='./style.scss'>

</style>

<template>
    <div class="wrap cardbox">
        <section class="give" v-if='bankList.length>0'>
            <div class="card clearfix" v-for="(item,i) in bankList" :key='item.userBankId'>
                <div class="china_bank clearfix">
                    <p>{{item.bankName}}<br/><span>{{item.cardType}}</span></p>
                    <span class="iconfont icon-huaban-3" @click='removeBank(i,item.userBankId)'></span>
                </div>
                <div class="china_bank_card">{{item.cardNo.substr(0,4)}}&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;&nbsp;{{item.cardNo.substr(-4)}}</div>
                <div class="china_bank_default">
                    <mt-checklist
                    v-model="value"
                    :options="[i]"
                    @change='checkselect(i,item.userBankId)'>
                    </mt-checklist>
                    <span>默认收款卡</span>
                </div>
            </div>
        </section>
        <section class="section">
            <ul class="msg_list">
                <li>
                    <router-link to="/user/add_card">
                        <div>
                            <span>+</span>
                            <span class="arrow_right float_right"></span>
                            <span class="message">添加银行卡</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </section>

    </div>
</template>

<script src='./script.js'>
    // import http from '../api/http'

</script>

