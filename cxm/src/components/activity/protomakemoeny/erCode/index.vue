<template>
    <div id='erCode'>
        <img src="../img/22222.png" alt="">
        <div class="ercode-box">
            <div class="ed-box">
            <div class="ed-b-t">
               扫码下载领取红包奖励 
            </div>
            <img src="../img/22223.jpg" alt="">
            <div class="ed-b-c">
                <div id="qrcode"></div>
                <div class="md-txt">
                    <p>我的推广码</p>
                    <p>
                        <span>{{userid}}</span>
                        <button @click="copy()">复制</button>
                    </p>
                </div>
            </div>
            <div class="ed-b-b">
                <p @click="screenShot()">保存图片</p>
                <p @click="share()">分享给好友</p>
            </div>
            </div>
            <div class="ed-alert">
                下载APP即可获得 68元 彩金券
            </div>
        </div>
    </div>
</template>

<script src='./script.js'>

</script>

<style lang='scss' src='./style.scss'>

</style>
