<style lang='scss' src='./style.scss'>

</style>

<template>
    <div class="setup">
        <p>账户安全</p>
        <div class="section">
            <ul class="msg_list">
                <!--<div class="pictureBox">-->
                    <!--<div class="txtest">我的头像</div>-->
                    <!--<input v-if="!panel" type="file" id="change" accept="image" @change="change" style="display:none;">  -->
                    <!--<label for="change">-->
                        <!--<img class="picture" :src="headerImage" alt="" v-if="headerImage!==''">-->
                        <!--&lt;!&ndash; <div class="picture" :style="'background:url('+headerImage+')'" v-if="headerImage!==''"></div> &ndash;&gt;-->
                        <!--<img src="../../../assets/img/portrait.png" alt="" v-else>    -->
                    <!--</label>  -->
                <!--</div>-->
                <li>
                    <a>
                        <div>
                            <span class="arrow_kefu float_right">{{userInfo.mobile}}</span>
                            <span class="message">手机认证</span>
                        </div>

                    </a>
                    <a>
                        <div>
                            <router-link to="/user/certification" v-if="userInfo.isReal ==0" class="arrow_kefu float_right" :style="{'color':'#ea5504'}">待认证</router-link>
                            <a v-if="userInfo.isReal ==1 " class="arrow_kefu float_right">{{userInfo.realInfo}}</a>
                            <span class="message">身份认证</span>
                        </div>
                    </a>
                    <a>
                        <div>

                            <span class="message">登录密码</span>
                            <router-link to="/user/setlogin" v-if="userInfo.hasPass ==0" class="arrow_kefu float_right" :style="{'color':'#ea5504'}">请设置密码</router-link>
                            <router-link to='/user/setchange' v-if="userInfo.hasPass ==1 " class="arrow_kefu float_right" :style="{'color':'#ea5504'}">更改密码</router-link>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <!-- 遮罩层 -->  
        <div class="container" v-show="panel">  
        <div>  
            <img id="image" :src="url" alt="Picture">  
        </div>  
    
        <button type="button" id="button" @click="commit">确定</button>  
        <button type="button" id="cancel" @click="cancel">取消</button> 
            
        </div> 
    </div>
</template>

<script src='./script.js'>

</script>
