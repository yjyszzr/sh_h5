<style lang='scss' scoped src='./style.scss'>

</style>

<!--账户明细-->
<template>
    <div class="wrap bonus">
        <mt-loadmore :bottom-method="loadBottom" :bottom-distance='-20' :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore" @bottom-status-change="handleTopChange" @scroll='handleScroll($event)'>
                <div class="yh_Item" v-for="(item,i) in yhList" :key='i'>
                        <img src="../../../assets/img/guoqi.png" alt="" v-if="item.bonusStatus==0&&item.soonExprireBz==1">
                        <img src="../../../assets/img/weisx.png" alt="" v-if="item.bonusStatus==0&&item.soonExprireBz==2">
                        <img src="../../../assets/img/yiguoqi.png" alt="" v-if="item.bonusStatus==2">
                        <img src="../../../assets/img/shiyong.png" alt="" v-if="item.bonusStatus==1">
                        <div class="yh_ItemTop">
                            <p v-if="item.bonusStatus==0" >
                                <span>¥</span><span>{{item.bonusPrice}}</span>
                            </p>
                            <p v-if="item.bonusStatus==2" v-bind:style="{ color: curColor}" >
                                <span>¥</span><span>{{item.bonusPrice}}</span>
                            </p>
                            <p v-if="item.bonusStatus==1" v-bind:style="{ color: activeColor}">
                                <span>¥</span><span>{{item.bonusPrice}}</span>
                            </p>
                            <p>
                                <span>{{item.minGoodsAmount}}</span><br/>

                                <!-- <span>{{item.useRange}}</span> -->
                            </p>
                        </div>
                        <i></i>
                        <div class="yh_ItemBottom">
                            <a v-if="item.bonusStatus==0 && item.soonExprireBz != 2 " @click="goFreebuy()">立即使用</a>
                            <p class="poiu" v-if="item.soonExprireBz==2">立即使用</p>
                            <p>
                                <span>有效期:</span>
                                <span>{{item.limitTime}}</span>
                            </p>
                            <p>
                                <span>使用说明:</span>

                                <span>{{item.useRange}}</span>
                            </p>
                        </div>
                </div>
                <div class="nullstatus" v-if="yhList.length==0">
                    <img src="../../../assets/img/juan.png" alt="">
                    <span>暂无优惠券</span>
                </div>
                <p class="loadingText" v-show="bottomStatus !== 'loading'&&yhList.length>0">{{loadText}}</p>
                <div slot="bottom" class="mint-loadmore-bottom">
					<span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↓</span>
					<mt-spinner :type="1" v-show="bottomStatus === 'loading'" color="#e82822"></mt-spinner>
				</div>
			</mt-loadmore>
    </div>
</template>

<script src='./script.js'>
    // import http from '../api/http'

</script>

