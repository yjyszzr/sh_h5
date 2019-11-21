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
                <!-- <button class="loadBtn" v-if="detect==='ios'"  @click="iosload()" :disabled='flag==1?true:false'>{{flag==0?'立即安装':flag==1?'请稍后...':'信任开发者'}}</button> -->
                <div v-if="detect==='ios'" class="ios">
					<button class="loadBtn pt" @click="iosloadPt()" :disabled='flag==1?true:false'>
						<span>{{flag==0?'下载安装 普通版':flag==1?'请稍后...':'信任开发者'}}</span>
					</button>
					<button class="loadBtn cx" @click="iosloadCx()">
						下载安装
						<span>长效版</span>
					</button>
				</div>
                <button class="loadBtn" @click="androidload()" v-else>立即安装</button>
            </div>
            <div class="cj">
				<h3>常见问题</h3>
				<h4>1、什么是VIP长效版？</h4>
				<p>VIP长效版可在iPhone、ipod下载安装，与普通版相比，可以有效减少软件频繁签名授信次数，服务由第三方提供。<p>
				<h4>2、软件下载安装后无法打开或者闪退，怎么办？</h4>
				<p>您只需要先删除已安装的圣和彩店软件，在官网重新下载安装即可解决。<br />
				普通版：应用下载安装后，在“设置-通用-描述文件与设备管理”信任圣和彩店软件即可正常使用；<br />
				VIP长效版：根据下载引导安装并授信后，等待引用下载完成即可正常使用。</p>
				<h4>3.如果同时下载会怎么样？</h4>
				<p>不建议两个版本同时下载，如果您同时普通版跟长效版一起下载，桌面上会出现两个相同的客户端。</p>
			</div>
        </section>
    </div>
</template>
<script src='./script.js'>

</script>

