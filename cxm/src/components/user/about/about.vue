<style lang='scss' scoped src='./style.scss'>

</style>

<!--关于我们-->
<template>
    <div class="wrap about" >
        <div class="logo">
            <p>
                <span>圣和彩店</span> 
                <span>v1.1.0</span>
            </p>
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

        <!-- <section class="guanwang">
            <p>客服热线：<span>400-012-6600</span></p>
            <p>官网：<span>http://www.caixiaomi.com</span></p>
        </section> -->
    </div>
</template>

