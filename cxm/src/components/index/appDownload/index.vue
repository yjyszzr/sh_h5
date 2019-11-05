<style lang='scss' scoped  src='./style.scss'>

</style>

<template>
    <div class="appdownLoad">
        <header class="loadTop">
            <img src="./img/h5_01.png" alt="">
        </header>
        <section class="loadContent">
            <div class="app-info">
                <img class="h5_04" src="./img/h5_04.png" alt="">
                <div class="app-name">
                    <img class="h5_08" src="./img/h5_08.png" alt="">
                    <p>球多多</p>
                    <p v-show="detect==='ios'">企业版</p>
                </div>
                <button class="loadBtn" v-if="detect==='ios'"  @click="iosload()" :disabled='flag==1?true:false'>{{flag==0?'立即安装':flag==1?'请稍后...':'信任开发者'}}</button>
                <button class="loadBtn" @click="androidload()" v-else>立即安装</button>
            </div>
            <div class="ios-alert" v-show="detect==='ios'">
                <p>如果已安装球多多请先删除重新下载安装</p>
                <p>(未受信任的企业级开发者) 的解决办法</p>
                <p>进入「Silver…」→「信任」即可使用（详情如图)</p>
                <img src="./img/h5_12.jpg" alt="">
            </div>
        </section>
    </div>
</template>
<script src='./script.js'>

</script>

