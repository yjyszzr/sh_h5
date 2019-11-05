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
                    <p>每日赛事</p>
                    <p v-show="detect==='ios'">企业版</p>
                </div>
                <button class="loadBtn" v-if="detect==='ios'"  @click="iosload()" :disabled='flag==1?true:false'>{{flag==0?'立即安装':flag==1?'请稍后...':'信任开发者'}}</button>
                <button class="loadBtn" @click="androidload()" v-else>立即安装</button>
            </div>
        </section>
    </div>
</template>
<script src='./script.js'>

</script>

