<style lang='scss' scoped src='./style.scss'>

</style>


<!--密码登录-->
<template>
    <div class="wrap sms">
        <ul class="msg_list">
            <li>
                <a href="javascript:void(0);">
                    <div>
                        <i class="iconfont icon-huaban-" ref="sjh"></i>
                        <mt-field type='tel' placeholder="请输入手机号" v-model="phoneVal" @focus.native.capture="handleCommentFocus" @blur.native.capture="handleCommentBlur($event)"></mt-field>
                    </div>

                </a>
                <a href="javascript:void(0);">
                    <div>
                        <i class="iconfont icon-huaban-2" ref="code"></i>
                        <input @focus="handleCommentFocus2" @blur="handleCommentBlur2($event)" v-model="telVal" type="text" class="text1"  placeholder="输入验证码"/>
                        <button :disabled='$store.state.smsCode.disabled' @click="changeNum()" v-html="$store.state.smsCode.changeText"></button>
                    </div>
                </a>
            </li>
        </ul>
        <section class="button" @click="_login()">
            <a class="determine">短信登录</a>
        </section>
        <section class="buttonZc">
            <router-link :to='{path:"/user/register",query:{"fr":$route.query.fr}}' class="mine">新用户注册</router-link>
        </section>
        <section class="forgetM">
            <router-link :to='{path:"/user/pwd",query:{"returnGo":returnGo,"fr":$route.query.fr}}' class="x_in">密码登录</router-link>
        </section>
        <div class="prompt"></div>
    </div>
</template>

<script src='./script.js'>
    // import http from '../api/http'

</script>

