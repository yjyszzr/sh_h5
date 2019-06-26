<style lang='scss' scoped src='./style.scss'>
</style>

<template>
    <div class="registration">
        <div class="banner">
            <img onclick="return false" src="../tuiguang/img7.png" alt="注册彩小秘推广员佣金奖励赚不停">
        </div>
        <div class="section">
            <ul class="msg_list">
                <li>
                    <router-link to="/activity/tuiguang/popupleft">
                        <div>
                            <img src="../tuiguang/img9.png" alt="">
                            <span class="arrow_right float_right"></span>
                            <span class="message">{{address}}</span>
                        </div>
                    </router-link>
                    <a href="javascript:void(0);">
                        <div>
                            <i class="iconfont icon-huaban-"></i>
                             <input  type="tel" v-model="mobileVal" placeholder="请输入手机号" class="text"/>
                        </div>
                    </a>
                    <a href="javascript:void(0);">
                        <div>
                            <i class="iconfont icon-huaban-2"></i>
                            <input v-model="telVal" type="tel" placeholder="请输入验证码" class="text1"/>
                            <button :disabled='stop' @click="changeNum()" v-html="stop?remainTime+'秒后重新获取':'获取验证码'"></button>
                        </div>
                    </a>
                    <a href="javascript:void(0);">
                        <div>
                            <i class="iconfont icon-huaban-1"></i>
                            <input v-model="passwordVal" placeholder="请输入6-20位的密码" type="password" class="text" v-show="eyehide==false"/>
                            <input v-model="passwordVal" placeholder="请输入6-20位的密码" type="text" class="text" v-show="eyehide==true"/>
                            <em @click="eyehide==false?eyehide = true:eyehide = false"><i class="iconfont icon-huaban-6" v-show="eyehide==false"></i><i class="iconfont icon-huaban-5" v-show="eyehide==true"></i></em>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <section class="button" :style="{'background':passwordVal===''||telVal===''||mobileVal===''?'#9f9f9f':'#ea5504'}">
            <a class="determine" @click="reg_btn">注册成为推广员</a>
            <p v-if="passwordVal===''||telVal===''||mobileVal===''"></p>
        </section>
        <div class="kefu">客服电话：<a href="tel:400-012-6600">400-012-6600</a></div>
    </div>
</template>
<script src='./script.js'>

</script>