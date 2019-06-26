<style lang='scss' scoped src='./style.scss'>

</style>

<!--购彩记录-->
<template>
    <div class="wrap">
        <section>
            <!-- <v-userHeader :title='"投注明细"'></v-userHeader> -->
            <mt-loadmore :bottom-method="loadBottom" :bottom-distance='60' :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleTopChange" @scroll='handleScroll($event)'>
                <div class="section cont" v-for="(item,i) in recordList" :key='i'>
                    <a @click="goDetail(item)">
                        <p class="picker_p1">{{item.lotteryName}}<span :style="{'color':color(item.orderStatus)}">{{item.orderStatusDesc}}<i class="iconfont icon-icon-14"></i></span></p>
                        <p class="picker_p2">¥ {{item.ticketAmount}}</p>
                        <p class="picker_p3">{{item.payTime}}<span :style="{'color':color(item.orderStatus)}">{{item.orderStatusInfo}}</span></p>
                    </a>
                </div>
                <div class="nullstatus" v-if="recordList.length==0">
                        <img src="../../../assets/img/juan.png" alt="">
                        <span>暂无投注记录</span>
                </div>
                <p class="loadingText" v-show="bottomStatus !== 'loading'&&recordList.length>0">{{loadText}}</p>
                <div slot="bottom" class="mint-loadmore-bottom">
					    <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↓</span>
					    <mt-spinner :type="1" v-show="bottomStatus === 'loading'" color="#e82822"></mt-spinner>
				</div>
			</mt-loadmore>
        </section>
    </div>
</template>
<script src='./script.js'>
// import http from '../api/http'
</script>
