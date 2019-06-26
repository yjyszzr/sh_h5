<style lang='scss' src='./style.scss'>

</style>


<!--密码登录-->
<template>
    <div class="wrap register">

    <ul class="msg_list">
        <li>
            <a href="javascript:void(0);">
                <div>
                    <i class="iconfont icon-huaban-" ref="sjh"></i>
                    <mt-field type='tel' placeholder="请输入手机号" v-model="phoneVal" @focus.native.capture="handleCommentFocus" @blur.native.capture="handleCommentBlur($event)"></mt-field>
                    <!-- <input v-model="phoneVal" type="tel" placeholder="请输入手机号" class="text"/> -->
                </div>

            </a>
            <a href="javascript:void(0);">
                <div>
                    <i class="iconfont icon-huaban-1" ref="mima"></i>
                    <input @focus="handleCommentFocus1" @blur="handleCommentBlur1($event)" v-model="passwordVal" placeholder="请输入6-20位的密码" type="password" class="text" v-show="eyehide==false"/>
                    <input @focus="handleCommentFocus1" @blur="handleCommentBlur1($event)" v-model="passwordVal" placeholder="请输入6-20位的密码" type="text" class="text" v-show="eyehide==true"/>
                    <em @click="eyehide==false?eyehide = true:eyehide = false"><i class="iconfont icon-huaban-6" v-show="eyehide==false"></i><i class="iconfont icon-huaban-5" v-show="eyehide==true"></i></em>
                </div>
            </a>
            <a href="javascript:void(0);">
                <div>
                    <i class="iconfont icon-huaban-2" ref="code"></i>
                    <input @focus="handleCommentFocus2" @blur="handleCommentBlur2($event)" v-model="telVal" type="tel" placeholder="请输入验证码" class="text1"/>
                    <button :disabled='$store.state.smsCode.disabled' @click="changeNum()" v-html="$store.state.smsCode.changeText"></button>
                </div>
            </a>
        </li>
    </ul>
    <section class="button" @click="reg">
        <a class="determine">注册</a>
    </section>
    <div class="ment"><i class="iconfont icon-icon-29 xySelected" ref='xySelected' @click="xySelectedClick()"></i><p>我已满18周岁并同意接受<router-link to="/user/service">《注册服务协议》</router-link></p></div>
    <div class="prompt">请您输入合法的手机号</div>
    </div>
</template>

<script src='./script.js'>
    // import http from '../api/http'

</script>

