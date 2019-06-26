<style lang='scss' scoped src='./style.scss'>

</style>


<!--密码登录-->
<template>
  <div class="wrap login">
    <ul class="section msg_list">
      <li>
        <a href="javascript:void(0);">
          <div>
            <i class="iconfont icon-huaban-" ref="sjh"></i>
            <mt-field type='tel' placeholder="请输入手机号" v-model="phoneVal" @focus.native.capture="handleCommentFocus" @blur.native.capture="handleCommentBlur($event)"></mt-field>
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
      </li>
    </ul>
    <section class="button" @click="_login">
      <a class="determine">登录</a>
    </section>
    <section class="buttonZc">
      <router-link :to='{path:"/user/register",query:{"fr":$route.query.fr}}' class="mine">新用户注册</router-link>
    </section>
    <section class="forget">
      <router-link :to='{path:"/user/sms",query:{"fr":$route.query.fr}}' class="x_in">短信验证码登录</router-link>
      <router-link to='/user/find' class="x_sel">忘记密码？</router-link>

    </section>
    <div class="prompt"></div>
  </div>
</template>

<script src='./script.js'>
  // import http from '../api/http'
  
</script>

