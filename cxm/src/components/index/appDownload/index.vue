<style lang='scss' scoped  src='./style.scss'>

</style>

<template>
    <div class="appdownLoad">
        <div class="loadImg">
            <img src="../../../assets/img/downText.png" alt="" class="downText">
        </div>
        <div class="loadBox">
            <button v-if="detect==='android'" class="andr" @click="andrClick()">安卓下载</button>
            <p v-if="detect==='ios'" class="ios" @click="iosClick()">iOS下载</p>
        </div>  
    </div>
</template>
<script src='./script.js'>

</script>

