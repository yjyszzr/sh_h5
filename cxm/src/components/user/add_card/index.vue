<style lang='scss' scoped src='./style.scss'>

</style>

<!--关于我们-->
<template>
    <div class="wrap add_card" >
        <ul class="section msg_list">
            <li>
                <a href="javascript:void(0);">
                    <div style="display:flex;align-item:center;box-sizing:border-box;">
                        <label>姓名：</label>
                        <p style="font-size: 0.4rem;color:#505050;">{{this.$store.state.userInfo.realName}}</p>
                    </div>
                </a>
                <a href="javascript:void(0);">
                    <div>
                        <input type="tel" @input="bankCard()" maxlength='26' onKeyPress="if(event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;" v-model="blankNum" class="text" placeholder="请输入银行卡号"/>
                    </div>
                </a>
            </li>
        </ul>
        <p class="make">注：该卡号为默认收款</p>
        <section class="button" @click="add_card()">
            <a class="determine">添加</a>
        </section>
        <section class="plain">
            <p>温馨提示：</p>
            <p>1.请务必确保您的卡号和实名认证的姓名保持一致，否则将无法绑定成功；</p>
            <p>2.建议您绑定以下银行的卡片：中国、农业、工商、建设、兴业、光大、民生、邮储、交通、中信、平安、华夏、浦发、广发、招商、北京、上海银行，到账速度更快。目前暂不支持信用卡和存折账号提款，绑定时请使用银行借记卡（储蓄卡）；</p>
            <p>3.添加银行卡可能会有信息延迟，请耐心等待，如添加未成功请稍等片刻再添加或联系我们的客服人员；</p>
        </section>
    </div>
</template>

<script src='./script.js'>
    // import http from '../api/http'

</script>
