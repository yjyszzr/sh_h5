<style lang='scss' scoped src='./style.scss'>

</style>

<!--关于我们-->
<template>
    <div class="wrap about" >
        <div class="logo">
            <img src="../../../assets/img/logo.png" alt="彩小秘"/><i>v2.1.1</i>
        </div>
        <section style="background: #fff">
            <section class=" wechat">
                <ul class="msg_list">
                    <li>
                        <router-link to="/user/suggestion">
                            <div>
                                <span class="message">投诉建议</span> 
                            </div>
                        </router-link>
                        <router-link to="/user/insurance">
                            <div>
                                <span class="message">安全保障</span>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </section>
        </section>

        <section class="guanwang">
            <p>客服热线：<span>400-012-6600</span></p>
            <p>官网：<span>http://www.caixiaomi.com</span></p>
        </section>
    </div>
</template>

