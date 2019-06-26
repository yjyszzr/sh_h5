<style lang='scss' scoped src='./style.scss'>

</style>
<!--提现-->
<template>
    <div class="wrap">
        <section class="section">
            <p class="presented">可提现金额：{{withdrawObj.userMoney}}元</p>
            <ul class=" msg_list">
                <li>
                    <a>
                        <div>
                            <label>银行卡：</label>
                            <p class="text1">{{withdrawObj.defaultBankLabel==''?'请添加银行卡':withdrawObj.defaultBankLabel}}</p>
                            <router-link to="/user/credit_card" class="arrow_right float_right">管理</router-link>
                        </div>
                    </a>
                    <a href="javascript:void(0);">
                        <div>
                            <input v-model="withdrawVal" type="tel" class="text3" placeholder="请输入提现金额"/>
                            <span class="whole" @click="whole()">全部提现</span>
                        </div>
                    </a>
                </li>
            </ul>
        </section>
        <section class="button" @click="determine()">
            <a class="determine">立即提现</a>
        </section>
        <section class="plain" v-html="withdrawTxt">
         
        </section>
        <div class="prompt"></div>
    </div>
</template>

<script src='./script.js'>
    // import http from '../api/http'

</script>

