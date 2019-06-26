<template>
    <div class="quickInfo">
        <transition name="fade"> 
        <div class="quickListBox" v-if="typeof(xfbklist)!='string'&&xfbklist.length<=0">
            <ul class="quickList">
                <li class="isxq">
                    <p>
                        <span>卡号:</span>
                        <input @blur="backType()" v-model="blankNum" type="tel" @input="bankCard()" maxlength='26' onKeyPress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;" placeholder="请输入银行卡号">
                    </p>
                    <p @click='khxq()'>
                        <img src="./img/detail.png" alt="">
                    </p>
                </li>
                <li v-show="bankType!==''">
                    {{bankName}}&nbsp;<span>{{bankType=='0'?'储蓄卡':'信用卡'}}</span> 
                </li>
                <li>
                    <p>
                        <span>姓名:</span>
                        <input v-model="name" type="text" placeholder="请输入持卡人姓名">
                    </p>
                </li>
                <li>
                    <p>
                        <span>身份证:</span>
                        <input v-model="sfz" type="text" placeholder="请输入持卡人身份证号">
                    </p>
                </li>
                <li v-show="bankType!==''&&bankType=='1'" class="isxq">
                    <p>
                        <span>有效期:</span>
                        <input v-model="yxq" type="text" placeholder="请输入月份/年份">
                    </p>
                    <p @click='yxqxq()'><img src="./img/detail.png" alt=""></p>
                </li>
                <li v-show="bankType!==''&&bankType=='1'" class="isxq">
                    <p>
                        <span>CCVV2:</span>
                        <input v-model="ccvv" type="tel" placeholder="请输入卡背后三位数">
                    </p>
                    <p @click='ccv()'><img src="./img/detail.png" alt=""></p>
                </li>
                <li class="isxq">
                    <p>
                        <span>手机号:</span>
                        <input v-model="telval" type="tel" placeholder="请输入银行预留手机号">
                    </p>
                    <p @click='telxq()'><img src="./img/detail.png" alt=""></p>
                </li>
                <li>
                    <p>
                        <span>验证码:</span>
                        <input v-model="codeval" type="tel" placeholder="请输入短信验证码">
                    </p>
                    <button :disabled='smsCode.disabled' @click="changeNum()" v-html="smsCode.changeText">
                    
                    </button>
                </li>
            </ul>
            <div class="nCode">
                <span @click='nocodeClick()'>收不到验证码？</span> 
            </div>
            <button class="btn" @click='cfmBtn()'>
                确认支付
            </button>
        </div>
        </transition> 
        <transition name="fade"> 
        <v-quicksms :amt='amt' v-if="typeof(xfbklist)!='string'&&xfbklist.length>0"></v-quicksms>
        </transition> 
    </div>
</template>
<style src='./style.scss' scoped lang='scss'>

</style>
<script src='./script.js'>

</script>


