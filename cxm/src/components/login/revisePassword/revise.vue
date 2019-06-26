<style lang='scss' scoped src='./style.scss'>

</style>


<!--密码登录-->
<template>
    <div class="wrap revise">
        <ul class="section msg_list">
            <li>
                <a href="javascript:void(0);">
                    <div>
                        <i class="iconfont icon-huaban-1" ref="mima"></i>
                        <input @focus="handleCommentFocus1" @blur="handleCommentBlur1($event)" v-model="passwordVal" type="password" class="text" placeholder="请输入6-20位的密码"/>
                    </div>

                </a>
                <a href="javascript:void(0);">
                    <div>
                        <i class="iconfont icon-huaban-2" ref="code"></i>
                        <input @focus="handleCommentFocus2" @blur="handleCommentBlur2($event)" v-model="telVal"  type="tel" class="text1" placeholder="输入验证码"/>
                        <button :disabled='$store.state.smsCode.disabled' @click="changeNum()" v-html="$store.state.smsCode.changeText"></button>
                    </div>
                </a>
            </li>
        </ul>
        <section class="button"  @click="findNext()">
            <a class="determine">确认</a>
        </section>
        <div class="prompt"></div>
    </div>
</template>

<script src='./script.js'>
    // import http from '../api/http'

</script>

